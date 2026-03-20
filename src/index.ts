#!/usr/bin/env node
import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { login, createClient } from "./client.js";
import { registerNamespaceTools } from "./tools/namespace.js";
import { registerContainerTools } from "./tools/container.js";
import { registerContainerJobTools } from "./tools/container_job.js";
import { registerVolumeTools } from "./tools/volume.js";
import { registerRegistryTools } from "./tools/registry.js";
import { registerDatabaseClusterTools } from "./tools/database_cluster.js";
import { registerDatabaseTools } from "./tools/database.js";
import { registerDatabaseUserTools } from "./tools/database_user.js";
import { registerMessageQueueTools } from "./tools/message_queue.js";

async function main() {
  const username = process.env.NEXAA_USERNAME;
  const password = process.env.NEXAA_PASSWORD;

  if (!username || !password) {
    process.stderr.write(
      "Error: NEXAA_USERNAME and NEXAA_PASSWORD environment variables are required\n"
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
    name: "nexaa-mcp",
    version: "0.1.0",
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

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
