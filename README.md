# nexaa-mcp

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server that exposes [Nexaa](https://nexaa.io) cloud platform operations as tools to MCP-compatible clients such as Claude.

## What it does

nexaa-mcp connects to the Nexaa GraphQL API and provides tools for managing:

- **Namespaces** — list, create, get, delete
- **Containers** — list, create, get, modify, delete, list plans
- **Container Jobs** — list, create, get, modify, delete
- **Volumes** — list, create, delete, increase
- **Registries** — list, create, delete
- **Database Clusters** — list, create, get, modify, delete, list plans/versions
- **Databases** — create, delete
- **Database Users** — list, create, get, modify, delete, get credentials
- **Message Queues** — list, create, get, modify, delete, get credentials, list plans/versions

## Configuration

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

| Variable             | Required | Description                                                              |
| -------------------- | -------- | ------------------------------------------------------------------------ |
| `NEXAA_USERNAME`     | Yes      | Your Nexaa account username                                              |
| `NEXAA_PASSWORD`     | Yes      | Your Nexaa account password                                              |
| `NEXAA_GRAPHQL_URL`  | No       | GraphQL endpoint (default: `https://graphql.tilaa.com/graphql/platform`) |
| `NEXAA_KEYCLOAK_URL` | No       | Auth endpoint (default: `https://auth.tilaa.com`)                        |
| `TRANSPORT`          | No       | `stdio` (default) or `http`                                              |
| `PORT`               | No       | HTTP port when `TRANSPORT=http` (default: `3000`)                        |
| `MCP_AUTH_TOKEN`     | No       | Bearer token to protect the HTTP endpoint (recommended when hosting)     |

## Transports

### stdio (default)

The server communicates over stdin/stdout. This is the standard mode for running nexaa-mcp as a local subprocess from Claude Code or another MCP client.

### HTTP

Set `TRANSPORT=http` to start an HTTP server instead. This is the mode to use when hosting nexaa-mcp remotely (e.g. in a container).

The server exposes a single endpoint at `/mcp` that implements the [MCP Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http).

Set `MCP_AUTH_TOKEN` to require a `Authorization: Bearer <token>` header on all requests. Without it the endpoint is unprotected.

## Running locally

**Prerequisites:** Node.js 22+

```bash
npm install
npm run dev
```

To build and run the compiled output:

```bash
npm run build
npm start
```

## Running with Docker

Build the image:

```bash
docker build -t nexaa-mcp .
```

**stdio mode** (local use):

```bash
docker run --rm -i --env-file .env nexaa-mcp
```

**HTTP mode** (hosted use):

```bash
docker run --rm \
  -e NEXAA_USERNAME=your-username \
  -e NEXAA_PASSWORD=your-password \
  -e TRANSPORT=http \
  -e MCP_AUTH_TOKEN=your-secret-token \
  -p 3000:3000 \
  nexaa-mcp
```

## Connecting to Claude Code

### Local (stdio)

```json
{
  "mcpServers": {
    "nexaa": {
      "command": "node",
      "args": ["/path/to/nexaa-mcp/dist/index.js"],
      "env": {
        "NEXAA_USERNAME": "your-username",
        "NEXAA_PASSWORD": "your-password"
      }
    }
  }
}
```

Or via Docker:

```json
{
  "mcpServers": {
    "nexaa": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "NEXAA_USERNAME=your-username",
        "-e",
        "NEXAA_PASSWORD=your-password",
        "nexaa-mcp"
      ]
    }
  }
}
```

### Remote (HTTP)

Use `claude mcp add-json` to register the hosted server:

```bash
claude mcp add-json nexaa '{
  "type": "http",
  "url": "https://your-host.example.com/mcp",
  "headers": {
    "Authorization": "Bearer your-secret-token"
  }
}'
```

Or add it directly to `~/.claude.json` / `.mcp.json`:

```json
{
  "mcpServers": {
    "nexaa": {
      "type": "http",
      "url": "https://your-host.example.com/mcp",
      "headers": {
        "Authorization": "Bearer your-secret-token"
      }
    }
  }
}
```

To generate a secure token:

```bash
openssl rand -base64 32
```

## Development

The project uses a two-layer structure:

- `src/tools/{resource}.ts` — MCP tool definitions with Zod input schemas
- `src/queries/{resource}.graphql` — GraphQL queries and mutations

Types are generated from the schema and queries by running:

```bash
npm run codegen
```

To add a new resource, create `src/queries/{resource}.graphql`, run codegen, create `src/tools/{resource}.ts`, and register the tools in `src/index.ts`.
