const baseConfig = {
  brandName: 'Dilan Mirror',
  twitterUsername: '@7iomka',
  twitterURL: 'https://twitter.com/7iomka',
  instagramURL: 'https://instagram.com/third.glance',
  facebookURL: 'https://www.facebook.com/profile.php?id=100093357039629',
  telegramSupportURL: 'https://t.me/dilan_mirror_support',
  appBaseURL: import.meta.env.VITE_BASE_URL,
  apiBaseURL: import.meta.env.VITE_API_BASE_URL,
};

const lsConstants: Record<string, string> = {};

const appConfig = {
  ...baseConfig,
  lsConstants,
};

export { appConfig };
