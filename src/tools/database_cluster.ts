import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import {
  GetCloudDatabaseClustersDocument,
  GetCloudDatabaseClusterDocument,
  CloudDatabaseClusterCreateDocument,
  CloudDatabaseClusterModifyDocument,
  CloudDatabaseClusterDeleteDocument,
  ClusterPlansDocument,
  ClusterVersionsDocument,
  GetCloudDatabaseClusterUserCredentialsDocument,
  type GetCloudDatabaseClustersQuery,
  type GetCloudDatabaseClusterQuery,
  type CloudDatabaseClusterCreateMutation,
  type CloudDatabaseClusterModifyMutation,
  type ClusterPlansQuery,
  type ClusterVersionsQuery,
  type GetCloudDatabaseClusterUserCredentialsQuery,
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

const DatabaseInput = z.object({
  name: z.string(),
  state: z.enum(['PRESENT', 'ABSENT']),
  description: z.string().optional(),
});

const DatabaseUserPermission = z.object({
  databaseName: z.string(),
  permission: z.enum(['READ_ONLY', 'READ_WRITE']),
  state: z.enum(['PRESENT', 'ABSENT']),
});

const DatabaseUserInput = z.object({
  name: z.string(),
  password: z.string().optional(),
  state: z.enum(['PRESENT', 'ABSENT']),
  permissions: z.array(DatabaseUserPermission),
});

export function registerDatabaseClusterTools(server: McpServer, client: GraphQLClient): void {
  server.registerTool(
    'nexaa_db_cluster_list',
    { description: 'List all cloud database clusters' },
    async () => {
      const data = await client.request<GetCloudDatabaseClustersQuery>(
        GetCloudDatabaseClustersDocument,
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.cloudDatabaseClusters, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_db_cluster_get',
    {
      description: 'Get a cloud database cluster by name and namespace',
      inputSchema: {
        name: z.string(),
        namespace: z.string(),
      },
    },
    async ({ name, namespace }) => {
      const data = await client.request<GetCloudDatabaseClusterQuery>(
        GetCloudDatabaseClusterDocument,
        { cloudDatabaseClusterInput: { name, namespace } },
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.cloudDatabaseCluster, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_db_cluster_create',
    {
      description:
        'Create a cloud database cluster. Use nexaa_db_cluster_list_plans and nexaa_db_cluster_list_versions to discover valid plan IDs and spec values.',
      inputSchema: {
        name: z.string(),
        namespace: z.string(),
        plan: z.string().describe('Plan ID from nexaa_db_cluster_list_plans'),
        spec: z.object({
          type: z.string().describe('Database engine e.g. postgresql'),
          version: z.string().describe('Engine version e.g. 15'),
        }),
        databases: z.array(DatabaseInput).default([]),
        users: z.array(DatabaseUserInput).default([]),
        advisor: z
          .object({ enabled: z.boolean() })
          .optional()
          .describe('Enable database advisor (missing index suggestions)'),
        externalConnection: ExternalConnection.optional(),
      },
    },
    async (input) => {
      const data = await client.request<CloudDatabaseClusterCreateMutation>(
        CloudDatabaseClusterCreateDocument,
        { cloudDatabaseClusterInput: input },
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.cloudDatabaseClusterCreate, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_db_cluster_modify',
    {
      description:
        'Modify a cloud database cluster. name and namespace are required; all other fields are optional.',
      inputSchema: {
        name: z.string(),
        namespace: z.string(),
        plan: z.string().optional(),
        databases: z.array(DatabaseInput).optional(),
        users: z.array(DatabaseUserInput).optional(),
        advisor: z.object({ enabled: z.boolean() }).optional(),
        externalConnection: ExternalConnection.optional(),
      },
    },
    async (input) => {
      const data = await client.request<CloudDatabaseClusterModifyMutation>(
        CloudDatabaseClusterModifyDocument,
        { cloudDatabaseClusterModifyInput: input },
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.cloudDatabaseClusterModify, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_db_cluster_delete',
    {
      description:
        'Delete a cloud database cluster. WARNING: This permanently deletes the cluster and all its data. Requires confirm: true.',
      inputSchema: {
        name: z.string(),
        namespace: z.string(),
        confirm: z.boolean().describe('Must be true to confirm deletion'),
      },
    },
    async ({ name, namespace, confirm }) => {
      if (!confirm) {
        return {
          content: [
            {
              type: 'text',
              text: 'Deletion cancelled: confirm must be true to delete a database cluster.',
            },
          ],
        };
      }
      await client.request(CloudDatabaseClusterDeleteDocument, {
        cloudDatabaseClusterResourceInput: { name, namespace },
      });
      return {
        content: [{ type: 'text', text: `Database cluster "${name}" deleted.` }],
      };
    },
  );

  server.registerTool(
    'nexaa_db_cluster_list_plans',
    {
      description:
        'List available cloud database cluster plans with CPU, memory, storage, and pricing information',
    },
    async () => {
      const data = await client.request<ClusterPlansQuery>(ClusterPlansDocument);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.cloudDatabaseClusterPlans, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_db_cluster_list_versions',
    {
      description:
        'List supported database engine types and versions (e.g. postgresql 15, mysql 8)',
    },
    async () => {
      const data = await client.request<ClusterVersionsQuery>(ClusterVersionsDocument);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.cloudDatabaseClusterVersions, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_db_user_get_credentials',
    {
      description:
        'Retrieve the DSN (connection string) for a database user. The DSN contains credentials — treat it as sensitive.',
      inputSchema: {
        clusterName: z.string(),
        clusterNamespace: z.string(),
        username: z.string(),
      },
    },
    async ({ clusterName, clusterNamespace, username }) => {
      const data = await client.request<GetCloudDatabaseClusterUserCredentialsQuery>(
        GetCloudDatabaseClusterUserCredentialsDocument,
        {
          cloudDatabase: { name: clusterName, namespace: clusterNamespace },
          userName: username,
        },
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.cloudDatabaseClusterUserCredentials, null, 2),
          },
        ],
      };
    },
  );
}
