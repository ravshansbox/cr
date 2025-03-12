import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  exclude: [],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  jsxFramework: 'react',
  outdir: 'src/styled-system',
  preflight: true,
  strictPropertyValues: true,
  theme: { extend: {} },
});
