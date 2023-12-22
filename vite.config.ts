/* eslint-disable */
import path from 'path';
import { fileURLToPath } from 'url';
import { checker } from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { babel } from '@rollup/plugin-babel';
import svgr from 'vite-plugin-svgr';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { htmlPrerender } from 'vite-plugin-html-prerender';
import { i18nConfig } from './src/shared/config/i18n-config';
import svg from '@neodx/svg/vite';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const root = path.join(__dirname, 'src');
const srcFolderPath = fileURLToPath(new URL('./src', import.meta.url));
const distFolderPath = fileURLToPath(new URL('./dist', import.meta.url));

const routesToPrerender = i18nConfig.supportedLangs.map((lang) => {
  if (lang === i18nConfig.fallbackLang) return '/';

  return `/${lang}/`;
});

// console.log('routesToPrerender', routesToPrerender);

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
    vanillaExtractPlugin(),
    svg({
      root: 'src/shared/icons/sprite',
      group: false,
      output: 'src/public/static/sprites',
      resetColors: {
        replaceUnknown: 'currentColor',
        exclude: [/-colored\.svg$/],
      },
      fileName: '{name}.{hash:8}.svg',
      metadata: {
        path: 'src/shared/ui/icon/sprite.gen.ts',
        // generate metadata
        runtime: {
          size: true,
          viewBox: true,
        },
      },
    }),
    svgr(),
    htmlPrerender({
      /**
       * Required: Output directory of "vite build"
       */
      staticDir: path.join(__dirname, 'dist'),
      routes: routesToPrerender,
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
  build: {
    outDir: distFolderPath,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(srcFolderPath, 'index.html'),
      },
      output: {
        manualChunks: {
          // utils: ['clsx'],
          react: ['react', 'react-dom', 'react-router-dom'],
          stm: ['effector', 'effector-react', 'atomic-router', 'atomic-router-react'],
          i18next: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend',
          ],
          'floating-ui': ['@floating-ui/react', 'react-popper', '@popperjs/core'],
          sliders: [
            'swiper',
            'embla-carousel',
            'embla-carousel-react',
            'embla-carousel-auto-height',
            'embla-carousel-autoplay',
            'embla-carousel-class-names',
          ],
          fancybox: ['@fancyapps/ui'],
        },
      },
    },
  },
});
