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
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // scripts/serverChapterModules.ts eagerly imports every chapter MDX
        // file for SSR, while content/loadChapter.ts lazily imports the same
        // files for the client's per-chapter code split. Rollup flags every
        // chapter for this by design, not a real problem: the client bundle
        // still splits one chunk per chapter (see check-bundle-budgets.mjs).
        const isChapterSplitWarning =
          warning.message.includes('dynamically imported') &&
          warning.message.includes('but also statically imported') &&
          warning.message.includes('/content/chapters/');
        if (isChapterSplitWarning) return;
        warn(warning);
      },
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
