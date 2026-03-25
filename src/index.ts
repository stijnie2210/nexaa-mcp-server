#!/usr/bin/env node
import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { login, createClient, type TokenSet, type NexaaClient } from './client.js';
import { registerNamespaceTools } from './tools/namespace.js';
import { registerContainerTools } from './tools/container.js';
import { registerContainerJobTools } from './tools/container_job.js';
import { registerVolumeTools } from './tools/volume.js';
import { registerRegistryTools } from './tools/registry.js';
import { registerDatabaseClusterTools } from './tools/database_cluster.js';
import { registerDatabaseTools } from './tools/database.js';
import { registerDatabaseUserTools } from './tools/database_user.js';
import { registerMessageQueueTools } from './tools/message_queue.js';

async function buildNexaaClient(): Promise<NexaaClient> {
  const username = process.env.NEXAA_USERNAME;
  const password = process.env.NEXAA_PASSWORD;

  if (!username || !password) {
    process.stderr.write(
      'Error: NEXAA_USERNAME and NEXAA_PASSWORD environment variables are required\n',
    );
    process.exit(1);
  }

  let tokens: TokenSet;
  try {
    tokens = await login(username, password);
  } catch (err) {
    process.stderr.write(`Error: ${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  }

  return createClient(tokens);
}

function buildServer(client: NexaaClient): McpServer {
  const server = new McpServer({ name: 'nexaa-mcp', version: '0.1.0' });
  const { gql, authFetch } = client;

  registerNamespaceTools(server, gql);
  registerContainerTools(server, gql, authFetch);
  registerContainerJobTools(server, gql);
  registerVolumeTools(server, gql);
  registerRegistryTools(server, gql);
  registerDatabaseClusterTools(server, gql);
  registerDatabaseTools(server, gql);
  registerDatabaseUserTools(server, gql);
  registerMessageQueueTools(server, gql);

  return server;
}

async function startStdio() {
  const client = await buildNexaaClient();
  const server = buildServer(client);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

async function startHttp() {
  const port = parseInt(process.env.PORT ?? '3000', 10);
  const authToken = process.env.MCP_AUTH_TOKEN;

  const client = await buildNexaaClient();

  const app = express();
  app.use(express.json());

  // Return JSON 404s for OAuth discovery endpoints so Claude Code's HTTP client
  // doesn't fail trying to parse HTML 404s as JSON OAuth error responses.
  app.get('/.well-known/oauth-protected-resource', (_req, res) => {
    res.status(404).json({ error: 'not_supported' });
  });
  app.get('/.well-known/oauth-authorization-server', (_req, res) => {
    res.status(404).json({ error: 'not_supported' });
  });
  app.post('/register', (_req, res) => {
    res.status(404).json({ error: 'not_supported' });
  });

  const checkAuth: express.RequestHandler = (req, res, next) => {
    if (authToken) {
      const header = req.headers.authorization;
      if (header !== `Bearer ${authToken}`) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
    }
    next();
  };

  const handleMcp: express.RequestHandler = (req, res, next) => {
    const server = buildServer(client);
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    server
      .connect(transport)
      .then(() => transport.handleRequest(req, res, req.body))
      .catch(next);
  };

  app.post('/mcp', checkAuth, handleMcp);
  app.get('/mcp', checkAuth, handleMcp);
  app.delete('/mcp', checkAuth, handleMcp);

  app.listen(port, () => {
    process.stderr.write(`nexaa-mcp HTTP server listening on port ${port}\n`);
    if (!authToken) {
      process.stderr.write('Warning: MCP_AUTH_TOKEN is not set — endpoint is unprotected\n');
    }
  });
}

const transport = process.env.TRANSPORT ?? 'stdio';

if (transport === 'http') {
  startHttp();
} else {
  startStdio();
}
