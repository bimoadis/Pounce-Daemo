# PUMP.MCP Feature Audit

Tanggal audit: 2026-05-13

Dokumen ini membandingkan implementasi repo dengan brief di `pounce-daemon-dev-brief/`.

## Ringkasan

Status umum: sesuai.

Repo ini sudah mengikuti aturan utama brief:

- runtime website berada di `web/`
- root script hanya meneruskan ke workspace `web`
- local API memakai `web/server/vite-api-plugin.js`
- production API memakai `web/api/generate.js`
- shared server logic berada di `web/server/generate-token.js`
- marketing copy tentang `@pump-mcp/server`, `CLAUDE.md`, `.mcp.json`, dan endpoint SSE tetap ada sebagai narrative layer

## Detail Kecocokan

### Arsitektur runtime

- `package.json` root hanya menjalankan script workspace `web`
- `web/vite.config.js` memuat `viteApiPlugin()`
- `web/server/vite-api-plugin.js` menangani `POST /api/generate` untuk local dev dan preview
- `web/api/generate.js` menangani request production/serverless
- `web/server/generate-token.js` menjadi shared logic untuk generate token

### Landing page / content

- `web/index.html` sudah memuat:
  - install command `npx @pump-mcp/server install`
  - snippet `CLAUDE.md`
  - snippet `.mcp.json`
  - referensi endpoint `https://mcp.pouncedaemon.fun/sse`
  - penjelasan tool `pump_generate`, `pump_trending`, `pump_launch`
  - generator UI yang memanggil `/api/generate`

### Supporting files

- `examples/CLAUDE.md.example` ada
- `examples/.mcp.json.example` ada
- `web/.env.example` ada

## Penambahan Dalam Audit Ini

Untuk memenuhi kebutuhan "gimmick tapi jangan benar-benar digunakan", saya menambahkan placeholder non-runtime:

- `packages/server/README.md`
- `src/index.ts`
- `src/server.ts`
- `src/tools/generate.ts`
- `src/tools/trending.ts`
- `src/tools/launch.ts`

Semua file di atas bersifat narrative-only:

- tidak di-import oleh runtime
- tidak dipakai build
- tidak dihubungkan ke script root
- hanya menjadi placeholder agar konsep dari brief terlihat eksplisit di repo

## Catatan Aman

Jika nanti repo ini dikembangkan lagi, aturan aman tetap:

- ubah fitur website di `web/`
- jangan mengubah root scripts agar menunjuk ke `packages/server`
- jangan menjadikan file placeholder di `src/` atau `packages/server/` sebagai dependency runtime kecuali memang ingin mengubah arsitektur produk
