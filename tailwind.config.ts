/* eslint-disable import/no-default-export */
import { tailwindConfig } from './src/shared/config/tailwind'; // aliases don't work here ;-(

export default {
  ...tailwindConfig,
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
};
