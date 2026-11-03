import { fileURLToPath } from 'node:url';

import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [{ enforce: 'pre', ...mdx({ include: /\.md$/ }) }, react()],
  resolve: {
    alias: {
      'monaco-themes/themes': fileURLToPath(
        new URL('./node_modules/monaco-themes/themes', import.meta.url)
      ),
    },
  },
});
