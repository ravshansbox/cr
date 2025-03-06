import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    globalSetup: './src/setup.global.vitest.ts',
    setupFiles: ['./src/setup.vitest.ts'],
  },
});
