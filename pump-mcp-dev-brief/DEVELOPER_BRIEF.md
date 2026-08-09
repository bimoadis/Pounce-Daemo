# PUMP.MCP Developer Brief

This folder is documentation-only.

The `packages/server` architecture shown in older planning notes is a product narrative and packaging concept, not the runtime used by this repository today.

## What Is Real In This Repo

All working website behavior lives under `web/`.

Actual runtime map:

```text
web/
├── index.html                  # landing page UI and browser-side interactions
├── vite.config.js              # Vite config
├── api/generate.js             # Vercel serverless entry for production deploys
├── server/generate-token.js    # shared server-side token generation logic
├── server/vite-api-plugin.js   # local Vite /api/generate handler
├── public/logo.png             # static asset
└── .env.example                # local env template
```

## What Is Gimmick / Narrative Only

The following are conceptual references only and are not part of the live runtime of this repo:

- `packages/server`
- `src/index.ts`
- `src/server.ts`
- `src/tools/generate.ts`
- `src/tools/trending.ts`
- `src/tools/launch.ts`
- standalone SSE transport
- npm publish workflow for `@pump-mcp/server`

Those concepts may still appear in marketing copy, examples, or historical planning because the landing page sells an MCP product story. They must not be treated as local app architecture.

## Current Runtime Rules

1. Local dev uses `npm run dev` from the repo root.
2. Root scripts route into the `web` workspace only.
3. Local API requests are handled by Vite through `web/server/vite-api-plugin.js`.
4. Production API requests are handled by `web/api/generate.js`.
5. No standalone Express, SSE, or `packages/server` process is required for this website.

## Content Guidance

It is acceptable for the website to present:

- install commands like `npx @pounce-daemon/server install`
- CLAUDE.md snippets
- `.mcp.json` snippets
- references to `mcp.pouncedaemon.fun/sse`

That material is part of the product fiction / external-service positioning of the landing page.

It is not acceptable for local development, build scripts, or website interactivity to depend on a separate backend folder in this repo.

## Source Of Truth

For implementation decisions, use these files:

- `README.md`
- `package.json`
- `web/index.html`
- `web/vite.config.js`
- `web/api/generate.js`
- `web/server/generate-token.js`
- `web/server/vite-api-plugin.js`
