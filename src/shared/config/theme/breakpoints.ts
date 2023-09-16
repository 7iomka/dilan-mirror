import { em, getBreakpointValue } from './lib';

export const breakpointsClean = {
  min: 360, // 0
  xs: 360,
  xsm: 375,
  xsl: 414,
  sm: 576,
  smd: 640,
  md: 768,
  lg: 992,
  xl: 1200,
  lp: 1366,
  xxl: 1400,
};

export const breakpoints = Object.keys(breakpointsClean).reduce(
  (bps, key) => ({
    ...bps,
    [key]: em(breakpointsClean[key]),
  }),
  {} as Record<keyof typeof breakpointsClean, string>,
);

export const smallerThan = (breakpoint) =>
  `(max-width: ${getBreakpointValue(breakpoint, breakpoints)})`;
export const largerThan = (breakpoint) =>
  `(min-width: ${getBreakpointValue(breakpoint, breakpoints)})`;
