# Repo Strategy

This file is archival guidance only.

## Current Strategy

Keep the repository operationally simple:

- one working workspace: `web`
- one local runtime path: Vite
- one production API path: `web/api/generate.js`
- shared server logic inside `web/server/`

## Narrative Layer

The repo can still present a broader MCP product story through:

- landing-page copy
- example snippets
- conceptual docs in this folder

That narrative should not control the actual filesystem architecture.

## Implementation Rule

When code must change, prefer editing:

- `web/index.html`
- `web/vite.config.js`
- `web/server/*`
- `web/api/*`

Do not use this folder as a specification for runtime structure.
