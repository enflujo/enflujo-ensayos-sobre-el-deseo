import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./fuente', import.meta.url)),
    },
  },
  server: {
    proxy: { '/api': { target: 'http://localhost:3001', changeOrigin: true } },
  },
  clearScreen: false,
  build: {
    outDir: 'publico',
    assetsDir: 'estaticos',
    sourcemap: true,
  },
  publicDir: 'estaticos',
});
