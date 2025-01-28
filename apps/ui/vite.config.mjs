import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
  clearScreen: false,
  plugins: [viteReact()],
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
