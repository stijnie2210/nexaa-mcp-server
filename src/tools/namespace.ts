import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import {
  NAMESPACE_LIST,
  NAMESPACE_GET,
  NAMESPACE_CREATE,
  NAMESPACE_DELETE,
} from "../queries/namespace.js";

export function registerNamespaceTools(
  server: McpServer,
  client: GraphQLClient
): void {
  server.registerTool(
    "nexaa_namespace_list",
    { description: "List all namespaces in your Nexaa account" },
    async () => {
      const data = await client.request<{
        namespaces: unknown[];
      }>(NAMESPACE_LIST);
      return { content: [{ type: "text", text: JSON.stringify(data.namespaces, null, 2) }] };
    }
  );

  server.registerTool(
    "nexaa_namespace_get",
    {
      description: "Get a namespace by name",
      inputSchema: { name: z.string().describe("Namespace name") },
    },
    async ({ name }) => {
      const data = await client.request<{ namespace: unknown }>(NAMESPACE_GET, { name });
      return { content: [{ type: "text", text: JSON.stringify(data.namespace, null, 2) }] };
    }
  );

  server.registerTool(
    "nexaa_namespace_create",
    {
      description: "Create a new namespace",
      inputSchema: {
        name: z.string().describe("Namespace name"),
        description: z.string().optional().describe("Optional description"),
      },
    },
    async ({ name, description }) => {
      const data = await client.request<{ namespaceCreate: unknown }>(
        NAMESPACE_CREATE,
        { input: { name, description } }
      );
      return { content: [{ type: "text", text: JSON.stringify(data.namespaceCreate, null, 2) }] };
    }
  );

  server.registerTool(
    "nexaa_namespace_delete",
    {
      description: "Delete a namespace. WARNING: This will delete the namespace and all its resources. Requires confirm: true.",
      inputSchema: {
        name: z.string().describe("Namespace name to delete"),
        confirm: z.boolean().describe("Must be set to true to confirm deletion"),
      },
    },
    async ({ name, confirm }) => {
      if (!confirm) {
        return {
          content: [{ type: "text", text: "Deletion cancelled: confirm must be true to delete a namespace." }],
        };
      }
      await client.request(NAMESPACE_DELETE, { name });
      return { content: [{ type: "text", text: `Namespace "${name}" deleted.` }] };
    }
  );
}
