import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import {
  ContainerJobListDocument,
  ContainerJobByNameDocument,
  ContainerJobCreateDocument,
  ContainerJobModifyDocument,
  ContainerJobDeleteDocument,
  type ContainerJobListQuery,
  type ContainerJobByNameQuery,
  type ContainerJobCreateMutation,
  type ContainerJobModifyMutation,
} from '../generated/graphql.js';

const EnvironmentVariable = z.object({
  name: z.string(),
  value: z.string(),
  secret: z.boolean(),
  state: z.enum(['PRESENT', 'ABSENT']),
});

const MountVolume = z.object({
  name: z.string(),
  autoCreate: z.boolean(),
  increase: z.boolean(),
  size: z.number().optional().describe('Size in GB'),
});

const Mount = z.object({
  path: z.string().describe('Mount path inside the container'),
  volume: MountVolume,
  state: z.enum(['PRESENT', 'ABSENT']),
});

export function registerContainerJobTools(server: McpServer, client: GraphQLClient): void {
  server.registerTool(
    'nexaa_container_job_list',
    {
      description: 'List all container jobs in a namespace',
      inputSchema: { namespace: z.string() },
    },
    async ({ namespace }) => {
      const data = await client.request<ContainerJobListQuery>(ContainerJobListDocument, {
        namespaceName: namespace,
      });
      return {
        content: [
          { type: 'text', text: JSON.stringify(data.namespace?.containerJobs, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    'nexaa_container_job_get',
    {
      description: 'Get a container job by name',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
      },
    },
    async ({ namespace, name }) => {
      const data = await client.request<ContainerJobByNameQuery>(ContainerJobByNameDocument, {
        namespaceName: namespace,
        containerName: name,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.containerJob, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_container_job_create',
    {
      description:
        "Create a new container job. schedule is a cron expression e.g. '0 * * * *'. resources e.g. CPU_250_RAM_500.",
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
        image: z.string(),
        resources: z.string().describe('Resource profile e.g. CPU_250_RAM_500'),
        schedule: z.string().describe("Cron expression e.g. '0 * * * *'"),
        enabled: z.boolean().default(true),
        registry: z.string().optional(),
        command: z.array(z.string()).default([]),
        entrypoint: z.array(z.string()).default([]),
        environmentVariables: z.array(EnvironmentVariable).default([]),
        mounts: z.array(Mount).default([]),
      },
    },
    async (input) => {
      const data = await client.request<ContainerJobCreateMutation>(ContainerJobCreateDocument, {
        scheduledJob: input,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.containerJobCreate, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_container_job_modify',
    {
      description:
        'Modify an existing container job. namespace and name are required; all other fields are optional.',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
        image: z.string().optional(),
        resources: z.string().optional(),
        schedule: z.string().optional(),
        enabled: z.boolean().optional(),
        registry: z.string().optional(),
        command: z.array(z.string()).optional(),
        entrypoint: z.array(z.string()).optional(),
        environmentVariables: z.array(EnvironmentVariable).optional(),
        mounts: z.array(Mount).optional(),
      },
    },
    async (input) => {
      const data = await client.request<ContainerJobModifyMutation>(ContainerJobModifyDocument, {
        scheduledJob: input,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.containerJobModify, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_container_job_delete',
    {
      description: 'Delete a container job',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
      },
    },
    async ({ namespace, name }) => {
      await client.request(ContainerJobDeleteDocument, {
        namespaceName: namespace,
        containerJobName: name,
      });
      return {
        content: [
          {
            type: 'text',
            text: `Container job "${name}" deleted from namespace "${namespace}".`,
          },
        ],
      };
    },
  );
}
