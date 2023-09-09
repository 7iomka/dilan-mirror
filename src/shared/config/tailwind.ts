import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { corePlugins } from 'tailwindcss/lib/corePlugins';
// import cssVariablesPlugin from '@mertasan/tailwindcss-variables';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import bootstrapGridPlugin from 'tailwind-bootstrap-grid';
import customScrollbarPlugin from 'tailwind-scrollbar';
import { round } from './theme/lib';

import {
  customTypography,
  customUtilities,
  customComponents,
  colors,
  breakpoints,
  containerMaxWidths,
  spacing,
  radius,
  shadow,
  transition,
  fontSizes,
  fontFamily,
} from './theme';

export const tailwindConfig: Partial<Config> = {
  darkMode: ['class', '[data-theme="dark"]'], // custom class instead of default 'dark'
  // content paths always resolved by tailwind relative to root of every project
  // content: [
  //   './src/**/*.{ts,tsx,html}',
  //   './pages/**/*.{ts,tsx,html}',
  //   '../../packages/**/*.{ts,tsx}',
  // ],
  important: true,
  theme: {
    colors,
    // colors: {
    //   // all palette colors with css var value
    //   // use DEFAULT key for theme color with no-suffix (default shade used)
    //   ...Object.keys(colors).reduce((acc, color) => {
    //     return {
    //       ...acc,
    //       [color]: {
    //         DEFAULT: `rgba(var(--${color}-rgb), <alpha-value>)`,
    //         ...Object.keys(colors[color]).reduce((subAcc, curr) => {
    //           return {
    //             ...subAcc,
    //             [curr]: `rgba(var(--${color}-${curr}-rgb), <alpha-value>)`,
    //           };
    //         }, {}),
    //       },
    //     };
    //   }, {}),
    // },
    fontSizes,
    // transition parts
    ...transition,
    // own screens
    screens: breakpoints,
    // Border radius (.rounded-xxx)
    borderRadius: radius,
    spacing: spacing.all,
    boxShadow: shadow,
    // Object.keys(shadow).reduce((acc, curr) => {
    //   return {
    //     ...acc,
    //     // get shadows values from css variables
    //     [curr]: `var(--shadow-${curr})`,
    //   };
    // }, {}),
    aspectRatio: {
      ...Array.from(Array(21).keys()).reduce((acc, curr) => {
        return {
          ...acc,
          [`${curr + 1}`]: `${curr + 1}`, // from 1 to 21
        };
      }, {}),
    },
    extend: {
      fontFamily: {
        ...fontFamily,
        sans: fontFamily.default, // alias
      },
      maxWidth: {
        // Add .max-width-container-xxx, .max-width-container-xxx-without-gutter
        ...Object.keys(containerMaxWidths).reduce(
          (prev, curr) => ({
            ...prev,
            [`container-${curr}`]: containerMaxWidths[curr],
            [`container-${curr}-without-gutter`]: `calc(${containerMaxWidths[curr]} - var(--bs-gutter-x, calc(1.5rem / 2))`,
          }),
          {},
        ),
        container: 'var(--container-max-width)',
        'container-without-gutter': `calc(var(--container-max-width) - var(--bs-gutter-x, calc(1.5rem / 2)))`,
      },
      flexBasis: {
        // Add .basis-container-xxx, .basis-container-xxx-without-gutter
        ...Object.keys(containerMaxWidths).reduce(
          (prev, curr) => ({
            ...prev,
            [`container-${curr}`]: containerMaxWidths[curr],
            [`container-${curr}-without-gutter`]: `calc(${containerMaxWidths[curr]} - var(--bs-gutter-x, calc(1.5rem / 2))`,
          }),
          {},
        ),
        container: 'var(--container-max-width)',
        'container-without-gutter': `calc(var(--container-max-width) - var(--bs-gutter-x, calc(1.5rem / 2)))`,
      },
      // Add custom variants
      lineHeight: {
        ...Array.from({ length: 100 }, (_, i) => round(1 + i * 0.01)).reduce((acc, curr) => {
          return {
            ...acc,
            // usage: leading-1-5 (line-height: 1.5)
            // from v3.3 you may use text-sm/1-5
            [`${curr}`.replace('.', '-')]: `${curr}`,
          };
        }, {}),
      },
    },
  },
  plugins: [
    // we use this plugin only for add some css-vars from tailwind config
    // as a base we use css files for this purpose
    // cssVariablesPlugin({
    //   darkToRoot: true,
    //   darkSelector: '.color-scheme-dark',
    //   colorVariables: true,
    // }),
    bootstrapGridPlugin({
      containerMaxWidths,
      gridGutters: spacing.all,
    }),
    aspectRatioPlugin,
    customScrollbarPlugin({
      nocompatible: true,
    }),
    // Adding custom utilities here
    plugin((cfg) => {
      const { addComponents, addUtilities } = cfg;
      addComponents(customTypography);
      customComponents.map((cmp) => addComponents(cmp()));
      customUtilities.map((cmp) => addUtilities(cmp()));
    }),
  ],
  corePlugins: {
    ...corePlugins,
    aspectRatio: false,
    container: false, // use bootstrap grid implementation instead
    preflight: false, // disable preflight, and include modified version (prevent conflict with @emotion prepend)
  },
};
