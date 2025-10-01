# Pipedrive MCP Server v.1.0.3

This is a Model Context Protocol (MCP) server that connects to the Pipedrive API v2. It allows you to expose Pipedrive data and functionality to LLM applications like Claude.

## Features

- Read-only access to Pipedrive data
- Exposes deals, persons, organizations, and pipelines
- Includes all fields including custom fields
- Predefined prompts for common operations
- Docker support with multi-stage builds
- JWT authentication support
- Built-in rate limiting for API requests
- Advanced deal filtering (by owner, status, date range, value, etc.)

## Setup

### Standard Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your configuration:
   ```
   PIPEDRIVE_API_TOKEN=your_api_token_here
   PIPEDRIVE_DOMAIN=your-company.pipedrive.com
   ```
4. Build the project:
   ```
   npm run build
   ```
5. Start the server:
   ```
   npm start
   ```

### Docker Setup

#### Option 1: Using Docker Compose (standalone)

1. Copy `.env.example` to `.env` and configure your settings
2. Build and run with Docker Compose:
   ```
   docker-compose up -d
   ```

#### Option 2: Using Pre-built Docker Image

Pull and run the pre-built image from GitHub Container Registry:

```bash
docker run -i \
  -e PIPEDRIVE_API_TOKEN=your_api_token_here \
  -e PIPEDRIVE_DOMAIN=your-company.pipedrive.com \
  ghcr.io/juhokoskela/pipedrive-mcp-server:main
```

#### Option 3: Integrating into Existing Project

Add the MCP server to your existing application's `docker-compose.yml`:

```yaml
services:
  # Your existing services...

  pipedrive-mcp-server:
    image: ghcr.io/juhokoskela/pipedrive-mcp-server:main
    container_name: pipedrive-mcp-server
    restart: unless-stopped
    stdin_open: true
    tty: true
    environment:
      - PIPEDRIVE_API_TOKEN=${PIPEDRIVE_API_TOKEN}
      - PIPEDRIVE_DOMAIN=${PIPEDRIVE_DOMAIN}
      - PIPEDRIVE_RATE_LIMIT_MIN_TIME_MS=${PIPEDRIVE_RATE_LIMIT_MIN_TIME_MS:-250}
      - PIPEDRIVE_RATE_LIMIT_MAX_CONCURRENT=${PIPEDRIVE_RATE_LIMIT_MAX_CONCURRENT:-2}
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

Then add the required environment variables to your `.env` file.

### Environment Variables

Required:
- `PIPEDRIVE_API_TOKEN` - Your Pipedrive API token
- `PIPEDRIVE_DOMAIN` - Your Pipedrive domain (e.g., `your-company.pipedrive.com`)

Optional (JWT Authentication):
- `MCP_JWT_SECRET` - JWT secret for authentication
- `MCP_JWT_TOKEN` - JWT token for authentication
- `MCP_JWT_ALGORITHM` - JWT algorithm (default: HS256)
- `MCP_JWT_AUDIENCE` - JWT audience
- `MCP_JWT_ISSUER` - JWT issuer

Optional (Rate Limiting):
- `PIPEDRIVE_RATE_LIMIT_MIN_TIME_MS` - Minimum time between requests in milliseconds (default: 250)
- `PIPEDRIVE_RATE_LIMIT_MAX_CONCURRENT` - Maximum concurrent requests (default: 2)

## Using with Claude

To use this server with Claude for Desktop:

1. Configure Claude for Desktop by editing your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pipedrive": {
      "command": "node",
      "args": ["/path/to/pipedrive-mcp-server/build/index.js"],
      "env": {
        "PIPEDRIVE_API_TOKEN": "your_api_token_here",
        "PIPEDRIVE_DOMAIN": "your-company.pipedrive.com"
      }
    }
  }
}
```

2. Restart Claude for Desktop
3. In the Claude application, you should now see the Pipedrive tools available

## Available Tools

- `get-users`: Get all users/owners from Pipedrive to identify owner IDs for filtering
- `get-deals`: Get deals with flexible filtering options (search by title, date range, owner, stage, status, value range, etc.)
- `get-deal`: Get a specific deal by ID (including custom fields)
- `get-deal-notes`: Get detailed notes and custom booking details for a specific deal
- `search-deals`: Search deals by term
- `get-persons`: Get all persons from Pipedrive (including custom fields)
- `get-person`: Get a specific person by ID (including custom fields)
- `search-persons`: Search persons by term
- `get-organizations`: Get all organizations from Pipedrive (including custom fields)
- `get-organization`: Get a specific organization by ID (including custom fields)
- `search-organizations`: Search organizations by term
- `get-pipelines`: Get all pipelines from Pipedrive
- `get-pipeline`: Get a specific pipeline by ID
- `get-stages`: Get all stages from all pipelines
- `search-leads`: Search leads by term
- `search-all`: Search across all item types (deals, persons, organizations, etc.)

## Available Prompts

- `list-all-deals`: List all deals in Pipedrive
- `list-all-persons`: List all persons in Pipedrive
- `list-all-pipelines`: List all pipelines in Pipedrive
- `analyze-deals`: Analyze deals by stage
- `analyze-contacts`: Analyze contacts by organization
- `analyze-leads`: Analyze leads by status
- `compare-pipelines`: Compare different pipelines and their stages
- `find-high-value-deals`: Find high-value deals

## License

MIT
