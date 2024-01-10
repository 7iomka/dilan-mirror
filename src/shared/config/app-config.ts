const baseConfig = {
  brandName: 'Dilan Mirror',
  twitterUsername: '@Dilan_Mirror',
  twitterURL: 'https://twitter.com/Dilan_Mirror',
  instagramURL: 'https://instagram.com/dilan_mirror',
  instagramPersonalURL: 'https://www.instagram.com/vasily_dilan',
  facebookURL: 'https://www.facebook.com/profile.php?id=100093357039629',
  linkedinURL: 'https://www.linkedin.com/in/vasily-dilan-5592a1247',
  vkURL: 'https://vk.com/club223413692',
  telegramURL: 'https://t.me/dilan_mirror_news',
  youtubeURL: 'https://www.youtube.com/@DILANVASILE',
  telegramSupportURL: 'https://t.me/suport_dilan_mirror',
  appBaseURL: import.meta.env.VITE_APP_BASE_URL,
  apiBaseURL: import.meta.env.VITE_API_BASE_URL,
  accountURL: 'https://my.dilan-mirror.com',
  phone: '+971 58 549 7040',
  email: 'dilanmirror24@gmail.com',
};

const lsConstants: Record<string, string> = {};

const appConfig = {
  ...baseConfig,
  lsConstants,
};

export { appConfig };
