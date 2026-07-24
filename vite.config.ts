import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_BASE_URL || '/',
    plugins: [react()],
    resolve: {
      alias: {
        'monaco-themes/themes': fileURLToPath(
          new URL('./node_modules/monaco-themes/themes', import.meta.url)
        ),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          404: resolve(__dirname, '404.html'),
        },
      },
    },
  };
});
