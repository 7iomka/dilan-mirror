const baseConfig = {
  brandName: 'Название сайта',
  twitterUsername: '@7iomka',
  twitterURL: 'https://twitter.com/7iomka',
  instagramURL: 'https://www.instagram.com/7iomka',
  appBaseURL: import.meta.env.VITE_BASE_URL,
  apiBaseURL: import.meta.env.VITE_API_BASE_URL,
};

const lsConstants: Record<string, string> = {};

const appConfig = {
  ...baseConfig,
  lsConstants,
};

export { appConfig };
