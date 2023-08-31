/* eslint-disable */
import path from 'path';
import { fileURLToPath } from 'url';
import { checker } from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { babel } from '@rollup/plugin-babel';
import svgr from 'vite-plugin-svgr';
import { htmlPrerender } from 'vite-plugin-html-prerender';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const root = path.join(__dirname, 'src');
const srcFolderPath = fileURLToPath(new URL('./src', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  root: srcFolderPath,
  plugins: [
    babel({
      extensions: ['.ts'],
      babelHelpers: 'bundled',
    }),
    react(),
    tsconfigPaths(),
    svgr(),
    htmlPrerender({
      /**
       * Required: Output directory of "vite build"
       */
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
      minify: false,
    }),
    checker({ typescript: true }),
  ],
  // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks vite-plugin-ssr's CI
  optimizeDeps: { include: ['cross-fetch'] },
  resolve: {
    alias: [{ find: '@', replacement: srcFolderPath }],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
