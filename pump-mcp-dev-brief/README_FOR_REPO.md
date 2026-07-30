# README Notes For This Repo

Use the root `README.md` as the canonical repository README.

This file exists only to preserve the original product framing for PUMP.MCP. It is not the implementation guide.

## Important

- The website is implemented from `web/`.
- Local API behavior is implemented from `web/server/`.
- Production serverless behavior is implemented from `web/api/`.
- The `packages/server` tree described in earlier notes is not present as a working backend in this repo.

## Allowed Marketing Copy

The site may still talk about:

- `@pump-mcp/server`
- MCP tools like `pump_generate`
- remote SSE endpoint examples

That copy is fine as landing-page positioning.

## Do Not Reintroduce

Do not add these back unless the product truly needs them:

- standalone Express server
- local SSE transport
- root scripts pointing to `packages/server`
- release workflow that publishes a missing package
