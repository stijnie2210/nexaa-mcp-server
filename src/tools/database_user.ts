import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import {
  DB_USER_LIST,
  DB_USER_CREATE,
  DB_USER_MODIFY,
  DB_USER_DELETE,
} from "../queries/database_user.js";

const DatabaseUserPermission = z.object({
  databaseName: z.string(),
  permission: z.enum(["READ_ONLY", "READ_WRITE"]),
  state: z.enum(["PRESENT", "ABSENT"]),
});

export function registerDatabaseUserTools(
  server: McpServer,
  client: GraphQLClient
): void {
  server.registerTool(
    "nexaa_db_user_list",
    {
      description: "List all users of a cloud database cluster",
      inputSchema: {
        clusterName: z.string(),
        clusterNamespace: z.string(),
      },
    },
    async ({ clusterName, clusterNamespace }) => {
      const data = await client.request<{
        cloudDatabaseCluster: { users: unknown[] };
      }>(DB_USER_LIST, {
        cloudDatabaseCluster: {
          name: clusterName,
          namespace: clusterNamespace,
        },
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data.cloudDatabaseCluster.users, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "nexaa_db_user_create",
    {
      description: "Create a user in a cloud database cluster",
      inputSchema: {
        clusterName: z.string(),
        clusterNamespace: z.string(),
        username: z.string(),
        password: z.string().optional(),
        permissions: z.array(DatabaseUserPermission).default([]),
      },
    },
    async ({ clusterName, clusterNamespace, username, password, permissions }) => {
      const data = await client.request<{
        cloudDatabaseClusterUserCreate: unknown;
      }>(DB_USER_CREATE, {
        userInput: {
          cluster: { name: clusterName, namespace: clusterNamespace },
          user: {
            name: username,
            password,
            state: "PRESENT",
            permissions,
          },
        },
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data.cloudDatabaseClusterUserCreate, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "nexaa_db_user_modify",
    {
      description: "Modify a database user's permissions",
      inputSchema: {
        clusterName: z.string(),
        clusterNamespace: z.string(),
        username: z.string(),
        permissions: z.array(DatabaseUserPermission),
      },
    },
    async ({ clusterName, clusterNamespace, username, permissions }) => {
      const data = await client.request<{
        cloudDatabaseClusterUserModify: unknown;
      }>(DB_USER_MODIFY, {
        userInput: {
          cluster: { name: clusterName, namespace: clusterNamespace },
          user: {
            name: username,
            state: "PRESENT",
            permissions,
          },
        },
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data.cloudDatabaseClusterUserModify, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "nexaa_db_user_delete",
    {
      description: "Delete a user from a cloud database cluster",
      inputSchema: {
        clusterName: z.string(),
        clusterNamespace: z.string(),
        username: z.string(),
      },
    },
    async ({ clusterName, clusterNamespace, username }) => {
      await client.request(DB_USER_DELETE, {
        userInput: {
          cluster: { name: clusterName, namespace: clusterNamespace },
          name: username,
        },
      });
      return {
        content: [
          {
            type: "text",
            text: `User "${username}" deleted from cluster "${clusterName}".`,
          },
        ],
      };
    }
  );
}
