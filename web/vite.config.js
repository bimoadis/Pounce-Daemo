import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import apiPlugin from './vite-api-plugin.js';

export default defineConfig(({ mode }) => {
  // Load env file based on current mode
  const env = loadEnv(mode, process.cwd(), '');

  // Populate process.env so local api middleware can access them
  process.env.MEGALLM_API_KEY = env.MEGALLM_API_KEY;
  process.env.MEGALLM_BASE_URL = env.MEGALLM_BASE_URL;
  process.env.MEGALLM_MODEL = env.MEGALLM_MODEL;

  return {
    plugins: [react(), apiPlugin()],
    server: {
      port: 5173,
    },
  };
});
