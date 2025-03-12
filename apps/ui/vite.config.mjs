import url from 'node:url';
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
  clearScreen: false,
  plugins: [viteReact()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: url.fileURLToPath(new url.URL('./src', import.meta.url)),
      },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
