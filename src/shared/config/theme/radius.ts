import { rem } from './lib';

/**
 * Predefined radius aliased values
 */
export const radius = {
  xs: rem(2), // 1
  sm: rem(3), // 2
  md: rem(5), // 3
  lg: rem(16), // 5
  xl: rem(32),
  // tailwind only
  none: rem(0),
  full: rem(9999),
};

export const radiusKeys = Object.keys(radius) as (keyof typeof radius)[];
