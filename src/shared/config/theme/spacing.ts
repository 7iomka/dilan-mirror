import { rem } from './lib';

const spacingAliased = {
  xs: rem(10),
  sm: rem(12),
  md: rem(16),
  lg: rem(20),
  xl: rem(24),
};

const spacingLength = Array.from(Array(301).keys());

const all = {
  ...Object.keys(spacingAliased).reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: spacingAliased[curr],
    };
  }, {} as Record<keyof typeof spacingAliased, string>),
  ...spacingLength.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: rem(curr),
    };
  }, {}),
};

export const spacing = {
  all,
  aliased: spacingAliased,
};
