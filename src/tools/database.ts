import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import { DB_CREATE, DB_DELETE } from '../queries/database.js';

export function registerDatabaseTools(server: McpServer, client: GraphQLClient): void {
  server.registerTool(
    'nexaa_db_create',
    {
      description: 'Add a database to an existing cloud database cluster',
      inputSchema: {
        clusterName: z.string(),
        clusterNamespace: z.string(),
        name: z.string().describe('Database name'),
        description: z.string().optional(),
      },
    },
    async ({ clusterName, clusterNamespace, name, description }) => {
      const data = await client.request<{
        cloudDatabaseClusterDatabaseCreate: unknown;
      }>(DB_CREATE, {
        cloudDatabaseClusterDatabaseInput: {
          cloudDatabaseCluster: {
            name: clusterName,
            namespace: clusterNamespace,
          },
          name,
          description,
          state: 'PRESENT',
        },
      });
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.cloudDatabaseClusterDatabaseCreate, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_db_delete',
    {
      description: 'Remove a database from a cloud database cluster',
      inputSchema: {
        clusterName: z.string(),
        clusterNamespace: z.string(),
        name: z.string().describe('Database name to delete'),
      },
    },
    async ({ clusterName, clusterNamespace, name }) => {
      await client.request(DB_DELETE, {
        cloudDatabaseClusterDatabaseInput: {
          cloudDatabaseCluster: {
            name: clusterName,
            namespace: clusterNamespace,
          },
          name,
        },
      });
      return {
        content: [
          {
            type: 'text',
            text: `Database "${name}" deleted from cluster "${clusterName}".`,
          },
        ],
      };
    },
  );
}
