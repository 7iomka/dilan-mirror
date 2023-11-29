const baseConfig = {
  brandName: 'Dilan Mirror',
  twitterUsername: '@Third_Glance',
  twitterURL: 'https://twitter.com/Third_Glance',
  instagramURL: 'https://instagram.com/dilan_mirror?igshid=NzZlODBkYWE4Ng%3D%3D',
  facebookURL: 'https://www.facebook.com/profile.php?id=100093357039629',
  linkedinURL: 'https://www.linkedin.com/in/vasily-dilan-5592a1247',
  vkURL: 'https://vk.com/club223413692',
  youtubeURL: 'https://youtube.com',
  telegramSupportURL: 'https://t.me/dilan_mirror_support',
  appBaseURL: import.meta.env.VITE_APP_BASE_URL,
  apiBaseURL: import.meta.env.VITE_API_BASE_URL,
};

const lsConstants: Record<string, string> = {};

const appConfig = {
  ...baseConfig,
  lsConstants,
};

export { appConfig };
