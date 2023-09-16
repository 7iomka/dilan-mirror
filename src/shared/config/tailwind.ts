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
  largerThan,
  widthSetup,
} from './theme';

/**
 * By default the spacing scale is inherited by the
 * padding, margin, width, height, maxHeight, gap, inset, space, translate, scrollMargin, and scrollPadding core plugins.
 * We extend this list with: maxWidth, flexBasis
 * Also we added `full` value for some rules
 */

export const tailwindConfig: Partial<Config> = {
  darkMode: ['class', '[data-theme="dark"]'], // custom class instead of default 'dark'
  // content paths always resolved by tailwind relative to root of every project
  // content: [
  //   './src/**/*.{ts,tsx,html}',
  //   './pages/**/*.{ts,tsx,html}',
  //   '../../packages/**/*.{ts,tsx}',
  // ],
  theme: {
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
    fontSize: fontSizes,
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
      colors,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        ...fontFamily,
        sans: fontFamily.default, // alias
      },
      width: widthSetup,
      maxWidth: widthSetup,
      minWidth: widthSetup,
      flexBasis: widthSetup,
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
      padding: {
        'container-gutter': 'var(--container-gutter)',
      },
      margin: {
        'container-gutter': 'var(--container-gutter)',
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
      const { addComponents, addUtilities, addBase } = cfg;

      addBase({
        ':root': {
          // breakpoints
          ...Object.keys(breakpoints).reduce((acc, curr) => {
            return {
              ...acc,
              [`--breakpoint-${curr}`]: breakpoints[curr],
            };
          }, {}),
          // container max-width
          '--container-max-width': containerMaxWidths.min,
          ...Object.keys(breakpoints).reduce(
            (acc: any, curr: any) => ({
              ...acc,
              [`@media ${largerThan(curr)}`]: {
                '--container-max-width': containerMaxWidths[curr] || breakpoints[curr],
              },
            }),
            {},
          ),
        },
      });
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
