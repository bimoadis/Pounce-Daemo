# PUMP.MCP Quick Reference

## Status

`pounce-daemon-dev-brief/` is a reference pack only.

Do not build local runtime from the older `packages/server` plan.

## Actual Working Files

```text
README.md
package.json
examples/CLAUDE.md.example
examples/.mcp.json.example
web/index.html
web/vite.config.js
web/api/generate.js
web/server/generate-token.js
web/server/vite-api-plugin.js
```

## Runtime Ownership

- UI, interactions, and snippets: `web/index.html`
- Local `/api/generate`: `web/server/vite-api-plugin.js`
- Shared token generation logic: `web/server/generate-token.js`
- Production `/api/generate`: `web/api/generate.js`
- Root dev/build/start commands: `package.json`

## Not Runtime

These are concept-only references:

- `packages/server/*`
- standalone SSE endpoint examples
- publish workflow examples for `@pump-mcp/server`
- old Railway/Fly deployment notes

## Safe Rule

If a feature affects the website, it should be implemented in `web/`.
