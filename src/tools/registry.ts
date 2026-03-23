import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import { REGISTRY_LIST, REGISTRY_CREATE, REGISTRY_DELETE } from '../queries/registry.js';

export function registerRegistryTools(server: McpServer, client: GraphQLClient): void {
  server.registerTool(
    'nexaa_registry_list',
    {
      description: 'List all private registry connections in a namespace',
      inputSchema: { namespace: z.string() },
    },
    async ({ namespace }) => {
      const data = await client.request<{
        namespace: { privateRegistries: unknown[] };
      }>(REGISTRY_LIST, { namespaceName: namespace });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.namespace.privateRegistries, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_registry_create',
    {
      description:
        'Add a private container registry connection. Note: password is write-only and will not be returned in responses.',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
        source: z.string().describe('Registry URL e.g. registry.example.com'),
        username: z.string(),
        password: z.string(),
        verify: z.boolean().default(true).describe('Verify registry credentials on creation'),
      },
    },
    async (input) => {
      const data = await client.request<{ registryConnectionCreate: unknown }>(REGISTRY_CREATE, {
        input,
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.registryConnectionCreate, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_registry_delete',
    {
      description: 'Remove a private registry connection',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
      },
    },
    async ({ namespace, name }) => {
      await client.request(REGISTRY_DELETE, {
        namespaceName: namespace,
        registryName: name,
      });
      return {
        content: [
          {
            type: 'text',
            text: `Registry "${name}" deleted from namespace "${namespace}".`,
          },
        ],
      };
    },
  );
}
