#!/usr/bin/env node
import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { login, createClient } from './client.js';
import { registerNamespaceTools } from './tools/namespace.js';
import { registerContainerTools } from './tools/container.js';
import { registerContainerJobTools } from './tools/container_job.js';
import { registerVolumeTools } from './tools/volume.js';
import { registerRegistryTools } from './tools/registry.js';
import { registerDatabaseClusterTools } from './tools/database_cluster.js';
import { registerDatabaseTools } from './tools/database.js';
import { registerDatabaseUserTools } from './tools/database_user.js';
import { registerMessageQueueTools } from './tools/message_queue.js';

async function buildServer(): Promise<McpServer> {
  const username = process.env.NEXAA_USERNAME;
  const password = process.env.NEXAA_PASSWORD;

  if (!username || !password) {
    process.stderr.write(
      'Error: NEXAA_USERNAME and NEXAA_PASSWORD environment variables are required\n',
    );
    process.exit(1);
  }

  let accessToken: string;
  try {
    accessToken = await login(username, password);
  } catch (err) {
    process.stderr.write(`Error: ${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  }

  const client = createClient(accessToken);

  const server = new McpServer({
    name: 'nexaa-mcp',
    version: '0.1.0',
  });

  registerNamespaceTools(server, client);
  registerContainerTools(server, client);
  registerContainerJobTools(server, client);
  registerVolumeTools(server, client);
  registerRegistryTools(server, client);
  registerDatabaseClusterTools(server, client);
  registerDatabaseTools(server, client);
  registerDatabaseUserTools(server, client);
  registerMessageQueueTools(server, client);

  return server;
}

async function startStdio() {
  const server = await buildServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

async function startHttp() {
  const port = parseInt(process.env.PORT ?? '3000', 10);
  const authToken = process.env.MCP_AUTH_TOKEN;

  const server = await buildServer();

  const app = express();
  app.use(express.json());

  // Stub OAuth discovery endpoints so Claude Code's HTTP client doesn't fail
  // trying to parse 404 HTML as JSON OAuth error responses (known Claude Code bug).
  app.get('/.well-known/oauth-protected-resource', (_req, res) => {
    res.json({ resource: `http://localhost:${port}` });
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
