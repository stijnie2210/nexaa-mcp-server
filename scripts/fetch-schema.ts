import 'dotenv/config';
import { writeFile } from 'node:fs/promises';
import {
  buildClientSchema,
  getIntrospectionQuery,
  lexicographicSortSchema,
  printSchema,
  type IntrospectionQuery,
} from 'graphql';
import { format } from 'prettier';
import { login } from '../src/client.js';

// Fetches the live schema through introspection and writes it to schema.graphql.
// With NEXAA_USERNAME/NEXAA_PASSWORD set, the request is authenticated, which exposes
// fields that anonymous introspection hides.
const GRAPHQL_URL = process.env.NEXAA_GRAPHQL_URL ?? 'https://graphql.tilaa.com/graphql/platform';
const OUTPUT = 'schema.graphql';

async function main(): Promise<void> {
  const username = process.env.NEXAA_USERNAME;
  const password = process.env.NEXAA_PASSWORD;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (username && password) {
    const tokens = await login(username, password);
    headers.Authorization = `Bearer ${tokens.accessToken}`;
  } else {
    console.warn('NEXAA_USERNAME/NEXAA_PASSWORD not set, fetching the anonymous schema');
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: getIntrospectionQuery({ descriptions: true }) }),
  });
  if (!response.ok) {
    throw new Error(`Introspection failed (${response.status}): ${await response.text()}`);
  }

  const result = (await response.json()) as { data?: IntrospectionQuery; errors?: unknown[] };
  if (!result.data) {
    throw new Error(`Introspection returned errors: ${JSON.stringify(result.errors)}`);
  }

  // Sort so re-fetching only shows real changes in the diff
  const sdl = printSchema(lexicographicSortSchema(buildClientSchema(result.data)));
  await writeFile(OUTPUT, await format(sdl, { parser: 'graphql', printWidth: 100 }));
  console.log(`Wrote ${OUTPUT}${headers.Authorization ? ' (authenticated)' : ''}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
