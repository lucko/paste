import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'monaco-themes/themes': fileURLToPath(
        new URL('./node_modules/monaco-themes/themes', import.meta.url)
      ),
    },
  },
});
