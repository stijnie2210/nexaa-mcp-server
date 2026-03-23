import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import {
  MessageQueuesGetDocument,
  MessageQueueGetDocument,
  MessageQueueCreateDocument,
  MessageQueueModifyDocument,
  MessageQueueDeleteDocument,
  MessageQueuePlansGetDocument,
  MessageQueueVersionsGetDocument,
  MessageQueueUserCredentialsGetDocument,
  type MessageQueuesGetQuery,
  type MessageQueueGetQuery,
  type MessageQueueCreateMutation,
  type MessageQueueModifyMutation,
  type MessageQueuePlansGetQuery,
  type MessageQueueVersionsGetQuery,
  type MessageQueueUserCredentialsGetQuery,
} from '../generated/graphql.js';

const AllowListEntry = z.object({
  ip: z.string(),
  state: z.enum(['PRESENT', 'ABSENT']),
});

const ExternalConnectionPort = z.object({
  externalPort: z
    .number()
    .optional()
    .describe(
      'Omit when creating a new port — the platform assigns the external port automatically. Required when modifying or removing an existing port so the backend knows which port to target.',
    ),
  internalPort: z.number().optional(),
  protocol: z.enum(['TCP', 'UDP']),
  state: z.enum(['PRESENT', 'ABSENT']),
  allowList: z.array(AllowListEntry),
});

const ExternalConnection = z.object({
  sharedIp: z.boolean(),
  state: z.enum(['PRESENT', 'ABSENT']),
  ports: z.array(ExternalConnectionPort),
});

export function registerMessageQueueTools(server: McpServer, client: GraphQLClient): void {
  server.registerTool(
    'nexaa_message_queue_list',
    { description: 'List all message queues' },
    async () => {
      const data = await client.request<MessageQueuesGetQuery>(MessageQueuesGetDocument);
      return {
        content: [{ type: 'text', text: JSON.stringify(data.messageQueues, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_message_queue_get',
    {
      description: 'Get a message queue by name and namespace',
      inputSchema: {
        name: z.string(),
        namespace: z.string(),
      },
    },
    async ({ name, namespace }) => {
      const data = await client.request<MessageQueueGetQuery>(MessageQueueGetDocument, {
        messageQueueInput: { name, namespace },
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.messageQueue, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_message_queue_create',
    {
      description:
        'Create a message queue. Use nexaa_message_queue_list_plans and nexaa_message_queue_list_versions to discover valid plan IDs and spec values.',
      inputSchema: {
        name: z.string(),
        namespace: z.string(),
        plan: z.string().describe('Plan ID from nexaa_message_queue_list_plans'),
        spec: z.object({
          type: z.string().describe('e.g. rabbitmq'),
          version: z.string().describe('e.g. 3'),
          patchLevelVersion: z.string().optional(),
        }),
        allowList: z.array(AllowListEntry).default([]),
        externalConnection: ExternalConnection.optional(),
      },
    },
    async (input) => {
      const data = await client.request<MessageQueueCreateMutation>(MessageQueueCreateDocument, {
        messageQueueInput: input,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.messageQueueCreate, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_message_queue_modify',
    {
      description: "Modify a message queue's allowlist or external connection",
      inputSchema: {
        name: z.string(),
        namespace: z.string(),
        allowList: z.array(AllowListEntry).default([]),
        externalConnection: ExternalConnection.optional(),
      },
    },
    async (input) => {
      const data = await client.request<MessageQueueModifyMutation>(MessageQueueModifyDocument, {
        messageQueueInput: input,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.messageQueueModify, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_message_queue_delete',
    {
      description:
        'Delete a message queue. WARNING: This is irreversible. Requires confirm: true.',
      inputSchema: {
        name: z.string(),
        namespace: z.string(),
        confirm: z.boolean().describe('Must be set to true to confirm deletion'),
      },
    },
    async ({ name, namespace, confirm }) => {
      if (!confirm) {
        return {
          content: [
            {
              type: 'text',
              text: 'Deletion cancelled: confirm must be true to delete a message queue.',
            },
          ],
        };
      }
      await client.request(MessageQueueDeleteDocument, { messageQueueInput: { name, namespace } });
      return {
        content: [
          {
            type: 'text',
            text: `Message queue "${name}" deleted from namespace "${namespace}".`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_message_queue_list_plans',
    {
      description:
        'List available message queue plans with CPU, memory, storage, and pricing information',
    },
    async () => {
      const data = await client.request<MessageQueuePlansGetQuery>(MessageQueuePlansGetDocument);
      return {
        content: [{ type: 'text', text: JSON.stringify(data.messageQueuePlans, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_message_queue_list_versions',
    {
      description: 'List supported message queue engine types and versions',
    },
    async () => {
      const data = await client.request<MessageQueueVersionsGetQuery>(
        MessageQueueVersionsGetDocument,
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.messageQueueVersions, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_message_queue_get_credentials',
    {
      description:
        'Retrieve credentials (DSN, password) for a message queue user. Treat the result as sensitive.',
      inputSchema: {
        name: z.string().describe('Message queue name'),
        namespace: z.string(),
        username: z.string(),
      },
    },
    async ({ name, namespace, username }) => {
      const data = await client.request<MessageQueueUserCredentialsGetQuery>(
        MessageQueueUserCredentialsGetDocument,
        {
          messageQueueInput: { name, namespace },
          username,
        },
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.messageQueueUserCredentials, null, 2),
          },
        ],
      };
    },
  );
}
