import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import {
  ContainerListDocument,
  ContainerByNameDocument,
  ContainerCreateDocument,
  ContainerModifyDocument,
  ContainerDeleteDocument,
  ContainerListPlansDocument,
  type ContainerListQuery,
  type ContainerByNameQuery,
  type ContainerCreateMutation,
  type ContainerModifyMutation,
  type ContainerListPlansQuery,
} from '../generated/graphql.js';

const EnvironmentVariable = z.object({
  name: z.string(),
  value: z.string(),
  secret: z.boolean(),
  state: z.enum(['PRESENT', 'ABSENT']),
});

const AllowListEntry = z.object({
  ip: z.string(),
  state: z.enum(['PRESENT', 'ABSENT']),
});

const Ingress = z.object({
  port: z.number(),
  enableTLS: z.boolean(),
  whitelist: z.array(z.string()).describe('CIDR blocks'),
  domainName: z
    .string()
    .optional()
    .describe('Omit to have a default domain assigned automatically by the platform'),
  state: z.enum(['PRESENT', 'ABSENT']),
});

const HealthCheck = z.object({
  port: z.number(),
  path: z.string().describe('e.g. /health'),
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

const AutoScalingTrigger = z.object({
  type: z.enum(['CPU', 'MEMORY']),
  threshold: z.number().describe('Percentage threshold (1-100)'),
});

const AutoScaling = z.object({
  replicas: z.object({
    minimum: z.number(),
    maximum: z.number(),
  }),
  triggers: z.array(AutoScalingTrigger),
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

export function registerContainerTools(server: McpServer, client: GraphQLClient): void {
  server.registerTool(
    'nexaa_container_list_plans',
    {
      description: 'List all available container resource plans (CPU/RAM combinations)',
    },
    async () => {
      const data = await client.request<ContainerListPlansQuery>(ContainerListPlansDocument);
      return {
        content: [{ type: 'text', text: JSON.stringify(data.resourceSpecifications, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_container_list',
    {
      description: 'List all containers in a namespace',
      inputSchema: { namespace: z.string().describe('Namespace name') },
    },
    async ({ namespace }) => {
      const data = await client.request<ContainerListQuery>(ContainerListDocument, {
        namespaceName: namespace,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.namespace?.containers, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_container_get',
    {
      description: 'Get a container by name',
      inputSchema: {
        namespace: z.string().describe('Namespace name'),
        name: z.string().describe('Container name'),
      },
    },
    async ({ namespace, name }) => {
      const data = await client.request<ContainerByNameQuery>(ContainerByNameDocument, {
        namespaceName: namespace,
        containerName: name,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.container, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_container_create',
    {
      description:
        'Create a new container. resources must be a ContainerResources enum value e.g. CPU_250_RAM_500. type must be DEFAULT or STARTER.',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
        image: z.string().describe('Container image, e.g. nginx:latest'),
        resources: z.string().describe('Resource profile, e.g. CPU_250_RAM_500, CPU_500_RAM_1000'),
        type: z.enum(['DEFAULT', 'STARTER']).default('DEFAULT'),
        registry: z.string().optional().describe('Private registry name'),
        command: z.array(z.string()).default([]),
        entrypoint: z.array(z.string()).default([]),
        ports: z
          .array(z.string())
          .default([])
          .describe("Port numbers as strings, e.g. ['80', '443']"),
        environmentVariables: z.array(EnvironmentVariable).default([]),
        ingresses: z.array(Ingress).default([]),
        mounts: z.array(Mount).default([]),
        healthCheck: HealthCheck.optional(),
        autoScaling: AutoScaling.optional(),
        externalConnection: ExternalConnection.optional(),
      },
    },
    async (input) => {
      const { namespace, ...rest } = input;
      const data = await client.request<ContainerCreateMutation>(ContainerCreateDocument, {
        input: { namespace, ...rest },
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.containerCreate, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_container_modify',
    {
      description:
        'Modify an existing container. Only provide fields you want to change (except namespace and name which are always required). Note: resources cannot be changed on STARTER type containers.',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
        image: z.string().optional(),
        resources: z.string().optional(),
        registry: z.string().optional(),
        command: z.array(z.string()).optional(),
        entrypoint: z.array(z.string()).optional(),
        ports: z.array(z.string()).optional(),
        environmentVariables: z.array(EnvironmentVariable).optional(),
        ingresses: z.array(Ingress).optional(),
        mounts: z.array(Mount).optional(),
        healthCheck: HealthCheck.optional(),
        autoScaling: AutoScaling.optional(),
        externalConnection: ExternalConnection.optional(),
      },
    },
    async (input) => {
      const data = await client.request<ContainerModifyMutation>(ContainerModifyDocument, {
        input,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(data.containerModify, null, 2) }],
      };
    },
  );

  server.registerTool(
    'nexaa_container_delete',
    {
      description: 'Delete a container',
      inputSchema: {
        namespace: z.string(),
        name: z.string(),
      },
    },
    async ({ namespace, name }) => {
      await client.request(ContainerDeleteDocument, {
        namespace,
        container: name,
      });
      return {
        content: [
          {
            type: 'text',
            text: `Container "${name}" deleted from namespace "${namespace}".`,
          },
        ],
      };
    },
  );
}
