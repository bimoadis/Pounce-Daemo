# Pounce Daemon

> MCP server for pump.fun: lets Claude Code generate and launch tokens from your terminal.

I was manually writing pump.fun descriptions with Claude for a few months.
When MCP support dropped in Claude Code, I wired it up properly.
Now I just say `pump_generate --idea "my token concept"` and it handles the rest.


## Install

```bash
npx @pounce-daemon/server install
```
Or add directly to your project:

```bash
npm install @pounce-daemon/server
```

## Setup

Add to your `CLAUDE.md`:

```yaml
mcp_servers:
  - name: "pump-fun"
    url: "https://mcp.pumpmcp.fun/sse"
    type: http
```

Or add `.mcp.json` to your repo root:

```json
{
  "mcpServers": {
    "pump-fun": {
      "type": "http",
      "url": "https://mcp.pumpmcp.fun/sse"
    }
  }
}
```

## Usage

Once connected, Claude Code has 3 tools:

### `pump_generate`

Generate a pump.fun token from an idea.

Input: your idea in plain English  
Output: ticker, name, tagline, description, lore, vibe score, pump.fun URL

### `pump_trending`

Get currently trending tokens on pump.fun.

Output: list of top movers with market cap data

### `pump_launch`

Get a pre-filled pump.fun launch URL.

Input: ticker, name, description  
Output: URL ready to open in browser

## Example

```text
claude > Use pump_generate to make a token about AI agents that dream
```

```json
{
  "ticker": "$PNCE",
  "name": "Pounce Daemon",
  "tagline": "agents don't sleep. they process.",
  "description": "While you sleep, $PNCE agents are running. Processing market data, writing strategies, executing trades. The first token for the agents that never clock out.",
  "lore": "Born in a data center at 3am. Never been offline.",
  "vibeScore": 9,
  "pumpUrl": "https://pump.fun/create?name=Pounce+Daemon&symbol=PNCE&description=..."
}
```

## Local Development

```bash
git clone https://github.com/bimoadis/Tickerlab
cd Tickerlab
cp web/.env.example web/.env
# Add your ANTHROPIC_API_KEY to web/.env
npm install
npm run dev
```

Vite runs on `http://localhost:5173`.

`POST /api/generate` is handled directly by the Vite dev/preview server in local development, and by `web/api/generate.js` when deployed to Vercel.

Shared server-side logic lives in `web/server/`. There is no separate local backend folder that must be run alongside Vite.

## Deploy Web to Vercel

1. Import this repository in Vercel.
2. Set **Root Directory** to `web`.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add env var: `ANTHROPIC_API_KEY=...`
6. Deploy.

## The Token

`$PNCE` - the anchor token for this project.

The protocol that will launch a million tokens needed its own token first.

- [pumpmcp.fun](https://pumpmcp.fun)

## Repository Layout

```text
pounce-daemon/
├── pump-mcp-dev-brief/   # documentation-only, not runtime
├── web/
│   ├── index.html
│   ├── vite.config.js
│   ├── api/
│   └── server/
├── examples/
├── .github/workflows/
└── README.md
```

## License

MIT
