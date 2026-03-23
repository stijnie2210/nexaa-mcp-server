import { GraphQLClient } from 'graphql-request';

const KEYCLOAK_URL = process.env.NEXAA_KEYCLOAK_URL ?? 'https://auth.tilaa.com';
const GRAPHQL_URL = process.env.NEXAA_GRAPHQL_URL ?? 'https://graphql.tilaa.com/graphql/platform';
const KEYCLOAK_REALM = 'tilaa';
const KEYCLOAK_CLIENT_ID = 'cloud-tilaa';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function login(username: string, password: string): Promise<string> {
  const url = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;

  const body = new URLSearchParams({
    grant_type: 'password',
    client_id: KEYCLOAK_CLIENT_ID,
    username,
    password,
  });

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
  return data.access_token;
}

export function createClient(accessToken: string): GraphQLClient {
  return new GraphQLClient(GRAPHQL_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
