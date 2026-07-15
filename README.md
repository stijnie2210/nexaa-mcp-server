# nexaa-mcp

MCP (Model Context Protocol) server for the [Nexaa](https://nexaa.cloud) cloud platform. Exposes Nexaa operations as tools to any MCP-compatible client such as [Claude](https://claude.ai/code).

## Installation

### Pre-built binary

Download the latest release from the [releases page](https://github.com/nexaa-cloud/nexaa-mcp/releases) and place the binary somewhere on your `$PATH`.

### Build from source

Requires Go 1.21+.

```bash
git clone https://github.com/nexaa-cloud/nexaa-mcp
cd nexaa-mcp
go build -o nexaa-mcp .
```

## Authentication

The server supports two authentication methods:

**Environment variables (recommended for MCP clients):**
```bash
NEXAA_USERNAME=your@email.com
NEXAA_PASSWORD=yourpassword
```

**Reuse an existing nexaa-cli session:**  
If you have previously logged in with [`nexaa-cli login`](https://github.com/nexaa-cloud/nexaa-cli), the server will pick up the token from `auth.json` automatically.

Optional environment variables:

| Variable | Default | Description |
|---|---|---|
| `NEXAA_GRAPHQL_URL` | `https://graphql.tilaa.com/graphql/platform` | GraphQL endpoint |
| `NEXAA_KEYCLOAK_URL` | `https://auth.tilaa.com` | Auth endpoint |
| `NEXAA_TOKEN_FILE` | `./auth.json` | Token cache file |
| `MCP_HTTP_PORT` | _(unset)_ | Enable HTTP/SSE transport on this port |
| `MCP_HTTP_TOKEN` | _(unset)_ | Require this Bearer token on HTTP requests |

## Usage with Claude

Add the following to your Claude MCP configuration (e.g. `~/.claude/settings.json` or a project-level `.mcp.json`):

```json
{
  "mcpServers": {
    "nexaa": {
      "type": "stdio",
      "command": "/path/to/nexaa-mcp",
      "env": {
        "NEXAA_USERNAME": "your@email.com",
        "NEXAA_PASSWORD": "yourpassword"
      }
    }
  }
}
```

### HTTP/SSE transport

Set `MCP_HTTP_PORT` to run as an HTTP server instead of stdio. The server exposes SSE at `/sse` and the message endpoint at `/message`.

```bash
MCP_HTTP_PORT=8080 MCP_HTTP_TOKEN=secret ./nexaa-mcp
```

Connect a client to `http://localhost:8080/sse` with `Authorization: Bearer secret`.

## Available tools

### Namespaces
| Tool | Description |
|---|---|
| `nexaa_namespace_list` | List all namespaces |
| `nexaa_namespace_get` | Get a namespace by name |
| `nexaa_namespace_create` | Create a namespace |
| `nexaa_namespace_delete` | Delete a namespace |

### Containers
| Tool | Description |
|---|---|
| `nexaa_container_list_plans` | List available resource plans (CPU/RAM) |
| `nexaa_container_list` | List containers in a namespace |
| `nexaa_container_get` | Get a container by name |
| `nexaa_container_create` | Create a container |
| `nexaa_container_modify` | Modify a container |
| `nexaa_container_delete` | Delete a container |
| `nexaa_container_logs` | Fetch logs for a container replica |

### Container Jobs
| Tool | Description |
|---|---|
| `nexaa_container_job_list` | List container jobs in a namespace |
| `nexaa_container_job_get` | Get a container job by name |
| `nexaa_container_job_create` | Create a scheduled container job |
| `nexaa_container_job_modify` | Modify a container job |
| `nexaa_container_job_delete` | Delete a container job |

### Volumes
| Tool | Description |
|---|---|
| `nexaa_volume_list` | List volumes in a namespace |
| `nexaa_volume_create` | Create a persistent volume |
| `nexaa_volume_increase` | Increase volume size |
| `nexaa_volume_delete` | Delete a volume |

### Private Registries
| Tool | Description |
|---|---|
| `nexaa_registry_list` | List registry connections in a namespace |
| `nexaa_registry_create` | Add a private registry connection |
| `nexaa_registry_delete` | Remove a registry connection |

### Database Clusters
| Tool | Description |
|---|---|
| `nexaa_db_cluster_list` | List all database clusters |
| `nexaa_db_cluster_get` | Get a cluster by name and namespace |
| `nexaa_db_cluster_create` | Create a database cluster |
| `nexaa_db_cluster_modify` | Modify a database cluster |
| `nexaa_db_cluster_delete` | Delete a database cluster |
| `nexaa_db_cluster_list_plans` | List available cluster plans |
| `nexaa_db_cluster_list_versions` | List supported engine versions |
| `nexaa_db_user_get_credentials` | Get the DSN for a database user |

### Databases
| Tool | Description |
|---|---|
| `nexaa_db_create` | Add a database to a cluster |
| `nexaa_db_delete` | Remove a database from a cluster |

### Database Users
| Tool | Description |
|---|---|
| `nexaa_db_user_list` | List users of a cluster |
| `nexaa_db_user_create` | Create a database user |
| `nexaa_db_user_modify` | Modify a user's permissions |
| `nexaa_db_user_delete` | Delete a database user |

### Message Queues
| Tool | Description |
|---|---|
| `nexaa_message_queue_list` | List all message queues |
| `nexaa_message_queue_get` | Get a queue by name and namespace |
| `nexaa_message_queue_create` | Create a message queue |
| `nexaa_message_queue_modify` | Modify a queue's allowlist or external connection |
| `nexaa_message_queue_delete` | Delete a message queue |
| `nexaa_message_queue_list_plans` | List available queue plans |
| `nexaa_message_queue_list_versions` | List supported engine versions |
| `nexaa_message_queue_get_credentials` | Get credentials for a queue user |

### Billing
| Tool | Description |
|---|---|
| `nexaa_billing_get_financial_insights` | Get account credit and cost breakdown by namespace/resource |

## License

[MIT](LICENSE)
