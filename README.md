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

Copy `.env.example` to `.env` and fill in your Nexaa credentials:

```bash
cp .env.example .env
```

| Variable             | Required | Description                                                              |
| -------------------- | -------- | ------------------------------------------------------------------------ |
| `NEXAA_USERNAME`     | Yes      | Your Nexaa account username                                              |
| `NEXAA_PASSWORD`     | Yes      | Your Nexaa account password                                              |
| `NEXAA_GRAPHQL_URL`  | No       | GraphQL endpoint (default: `https://graphql.tilaa.com/graphql/platform`) |
| `NEXAA_KEYCLOAK_URL` | No       | Auth endpoint (default: `https://auth.tilaa.com`)                        |

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

Run it, passing credentials via environment variables:

```bash
docker run --rm \
  -e NEXAA_USERNAME=your-username \
  -e NEXAA_PASSWORD=your-password \
  nexaa-mcp
```

Or use a `.env` file:

```bash
docker run --rm --env-file .env nexaa-mcp
```

## Connecting to Claude

Add the server to your Claude MCP configuration. The server communicates over **stdio**.

**Local (npx / node):**

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

**Docker:**

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

## Development

The project uses a two-layer structure:

- `src/tools/{resource}.ts` — MCP tool definitions with Zod input schemas
- `src/queries/{resource}.ts` — GraphQL queries and mutations

To add a new resource, create both files and register the tools in `src/index.ts`.
