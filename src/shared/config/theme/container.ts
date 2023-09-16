import { rem } from './lib';
import { breakpointsClean } from './breakpoints';

export const containerMaxWidths = {
  min: rem(breakpointsClean.min),
  xs: rem(360),
  xsm: rem(375),
  xsl: rem(414),
  sm: rem(540),
  smd: rem(540),
  md: rem(720),
  lg: rem(960),
  xl: rem(1140),
  lp: rem(1140),
  xxl: rem(1320),
};
