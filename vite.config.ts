import { fileURLToPath, URL } from 'node:url';
import dynamicImport from 'vite-plugin-dynamic-import';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dynamicImport(/* options */)],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
