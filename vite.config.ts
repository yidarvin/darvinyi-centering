import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // MDX must run before the React plugin so its JSX output gets Fast Refresh.
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm], providerImportSource: '@mdx-js/react' }) },
    react({ include: /\.(jsx|tsx|mdx|js|ts)$/ }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    include: ['src/**/*.test.{ts,tsx}'],
    environmentOptions: {
      jsdom: { url: 'http://localhost/' },
    },
  },
});
