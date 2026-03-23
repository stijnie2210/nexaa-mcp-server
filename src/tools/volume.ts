import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import {
  VolumeListDocument,
  VolumeCreateDocument,
  VolumeIncreaseDocument,
  VolumeDeleteDocument,
  type VolumeListQuery,
  type VolumeCreateMutation,
  type VolumeIncreaseMutation,
} from '../generated/graphql.js';

export function registerVolumeTools(server: McpServer, client: GraphQLClient): void {
  server.registerTool(
    'nexaa_volume_list',
    {
      description: 'List all volumes in a namespace',
      inputSchema: { namespace: z.string() },
    },
    async ({ namespace }) => {
      const data = await client.request<VolumeListQuery>(VolumeListDocument, {
        namespaceName: namespace,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.namespace?.volumes, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_volume_create',
    {
      description: 'Create a new persistent volume',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
        size: z.number().describe('Size in GB'),
      },
    },
    async ({ namespace, name, size }) => {
      const data = await client.request<VolumeCreateMutation>(VolumeCreateDocument, {
        input: { namespace, name, size },
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.volumeCreate, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_volume_increase',
    {
      description:
        'Increase the size of an existing volume (size can only be increased, not decreased)',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
        size: z.number().describe('New size in GB (must be larger than current)'),
      },
    },
    async ({ namespace, name, size }) => {
      const data = await client.request<VolumeIncreaseMutation>(VolumeIncreaseDocument, {
        input: { namespace, name, size },
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.volumeIncrease, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_volume_delete',
    {
      description: 'Delete a volume',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
      },
    },
    async ({ namespace, name }) => {
      await client.request(VolumeDeleteDocument, {
        namespaceName: namespace,
        volumeName: name,
      });
      return {
        content: [
          {
            type: 'text',
            text: `Volume "${name}" deleted from namespace "${namespace}".`,
          },
        ],
      };
    },
  );
}
