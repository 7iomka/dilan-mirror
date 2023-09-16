export const colors = {
  inherit: 'inherit',
  transparent: 'transparent',
  current: 'currentColor',
  white: '#fff',
  black: '#000',
  primary: {
    DEFAULT: '#2ef0b6',
    light: '#85ffda',
    dark: '#16ba89',
    pale: '#188967',
  },
  dark: {
    50: '#9DA1AE',
    100: '#8C91A1',
    200: '#6E7486',
    300: '#575C6A',
    400: '#3E414C', // light (on hover)
    500: '#222429', // basic (black light)
    DEFAULT: '#222429',
    600: '#1E2024',
    700: '#17181C',
    800: '#141419', // darkest (black basic)
    900: '#070708',
    light: '#3E414C', // symlink to dark-400
  },
  gray: {
    50: '#F9F9FB',
    100: '#F3F4F6',
    200: '#EBECEF',
    300: '#E2E3E9',
    400: '#DADBE2', // gray (medium), changed from #D9DCE8
    500: '#D1D3DB',
    600: '#C9CAD4',
    700: '#BDBECB',
    800: '#A9AABC',
    900: '#9697AC', // gray-900 (dark)
    DEFAULT: '#DADBE2', // as 400
    custom: '#D9DCE8',
  },
  indigo: {
    50: '#F7F9FD', // indigo-50 (light)
    100: '#F4F6FA',
    200: '#EBEDF5', // indigo-200 (basic)
    300: '#E0E1F0',
    400: '#D5D7EB',
    500: '#CBCFE7',
    600: '#C1C2E1',
    700: '#B3B3DB',
    800: '#9A9AD0',
    900: '#8282C4',
    DEFAULT: '#EBEDF5', // as 200
  },
  success: '#2ef0b6', // same as primary
  danger: '#fe7375',
};
