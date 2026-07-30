/**
 * Narrative placeholder only.
 *
 * Tidak ada standalone server yang dijalankan dari file ini.
 * Local API aktif tetap melalui `web/server/vite-api-plugin.js`.
 */

export function createNarrativeServer() {
  return {
    enabled: false,
    reason: "Concept-only placeholder. Active runtime lives under web/.",
  };
}
