import { GraphQLClient } from 'graphql-request';

const KEYCLOAK_URL = process.env.NEXAA_KEYCLOAK_URL ?? 'https://auth.tilaa.com';
const GRAPHQL_URL = process.env.NEXAA_GRAPHQL_URL ?? 'https://graphql.tilaa.com/graphql/platform';
const API_BASE_URL = GRAPHQL_URL.replace(/\/graphql\/.*$/, '');
const KEYCLOAK_REALM = 'tilaa';
const KEYCLOAK_CLIENT_ID = 'cloud-tilaa';
// Refresh the token this many seconds before it actually expires
const REFRESH_BUFFER_SECONDS = 60;

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface TokenSet {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // unix ms
}

async function fetchToken(body: URLSearchParams): Promise<TokenSet> {
  const url = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Authentication failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as TokenResponse;
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + (data.expires_in - REFRESH_BUFFER_SECONDS) * 1000,
  };
}

export async function login(username: string, password: string): Promise<TokenSet> {
  return fetchToken(
    new URLSearchParams({
      grant_type: 'password',
      client_id: KEYCLOAK_CLIENT_ID,
      username,
      password,
    }),
  );
}

async function refresh(refreshToken: string): Promise<TokenSet> {
  return fetchToken(
    new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: KEYCLOAK_CLIENT_ID,
      refresh_token: refreshToken,
    }),
  );
}

export type AuthFetch = (path: string) => Promise<string>;

export interface NexaaClient {
  gql: GraphQLClient;
  authFetch: AuthFetch;
}

export function createClient(initial: TokenSet): NexaaClient {
  let tokens = initial;

  async function ensureFreshToken(): Promise<string> {
    if (Date.now() >= tokens.expiresAt) {
      tokens = await refresh(tokens.refreshToken);
    }
    return tokens.accessToken;
  }

  const gql = new GraphQLClient(GRAPHQL_URL);

  // Wrap request to transparently refresh the token when needed
  const originalRequest = gql.request.bind(gql) as (...args: unknown[]) => Promise<unknown>;
  gql.request = async (...args: unknown[]): Promise<unknown> => {
    gql.setHeader('Authorization', `Bearer ${await ensureFreshToken()}`);
    return originalRequest(...args);
  };

  gql.setHeader('Authorization', `Bearer ${tokens.accessToken}`);

  async function authFetch(path: string): Promise<string> {
    const token = await ensureFreshToken();
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(`Request failed (${response.status}): ${await response.text()}`);
    }
    return response.text();
  }

  return { gql, authFetch };
}
