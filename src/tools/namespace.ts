import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import {
  NamespaceListDocument,
  NamespaceGetDocument,
  NamespaceCreateDocument,
  NamespaceDeleteDocument,
  type NamespaceListQuery,
  type NamespaceGetQuery,
  type NamespaceCreateMutation,
} from '../generated/graphql.js';

export function registerNamespaceTools(server: McpServer, client: GraphQLClient): void {
  server.registerTool(
    'nexaa_namespace_list',
    { description: 'List all namespaces in your Nexaa account' },
    async () => {
      const data = await client.request<NamespaceListQuery>(NamespaceListDocument);
      return { content: [{ type: 'text', text: JSON.stringify(data.namespaces, null, 2) }] };
    },
  );

  server.registerTool(
    'nexaa_namespace_get',
    {
      description: 'Get a namespace by name',
      inputSchema: { name: z.string().describe('Namespace name') },
    },
    async ({ name }) => {
      const data = await client.request<NamespaceGetQuery>(NamespaceGetDocument, { name });
      return { content: [{ type: 'text', text: JSON.stringify(data.namespace, null, 2) }] };
    },
  );

  server.registerTool(
    'nexaa_namespace_create',
    {
      description: 'Create a new namespace',
      inputSchema: {
        name: z.string().describe('Namespace name'),
        description: z.string().optional().describe('Optional description'),
      },
    },
    async ({ name, description }) => {
      const data = await client.request<NamespaceCreateMutation>(NamespaceCreateDocument, {
        input: { name, description },
      });
      return { content: [{ type: 'text', text: JSON.stringify(data.namespaceCreate, null, 2) }] };
    },
  );

  server.registerTool(
    'nexaa_namespace_delete',
    {
      description:
        'Delete a namespace. WARNING: This will delete the namespace and all its resources. Requires confirm: true.',
      inputSchema: {
        name: z.string().describe('Namespace name to delete'),
        confirm: z.boolean().describe('Must be set to true to confirm deletion'),
      },
    },
    async ({ name, confirm }) => {
      if (!confirm) {
        return {
          content: [
            {
              type: 'text',
              text: 'Deletion cancelled: confirm must be true to delete a namespace.',
            },
          ],
        };
      }
      await client.request(NamespaceDeleteDocument, { name });
      return { content: [{ type: 'text', text: `Namespace "${name}" deleted.` }] };
    },
  );
}
