import type { PluginUtils } from 'tailwindcss/types/config';
import { containerMaxWidths } from './container';

export const widthSetup = ({ theme }: PluginUtils) => ({
  ...theme('spacing'),
  // Add .{}-container-xxx, .{}-container-xxx-without-gutter
  ...Object.keys(containerMaxWidths).reduce(
    (prev, curr) => ({
      ...prev,
      [`container-${curr}`]: containerMaxWidths[curr],
      [`container-${curr}-without-gutter`]: `calc(${containerMaxWidths[curr]} - var(--container-gutter)*2)`,
      [`container-${curr}-with-gutter`]: `calc(${containerMaxWidths[curr]} + var(--container-gutter)*2)`,
    }),
    {},
  ),
  container: 'var(--container-max-width)',
  'container-without-gutter': `calc(var(--container-max-width) - var(--container-gutter)*2)`,
  'container-with-gutter': `calc(var(--container-max-width) + var(--container-gutter)*2)`,
});
