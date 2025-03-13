import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      css: true,
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/setup.vitest.ts'],
    },
  }),
);
