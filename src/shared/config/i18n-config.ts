export const supportedLanguagesMap = {
  en: 'English',
  ru: 'Русский',
  // ro: 'Română',
  ar: 'العربية',
  hi: 'हिन्दी',
  vi: 'Tiếng Việt',
  es: 'Español',
  fr: 'Français',
  ko: '한국어',
  ja: '日本語',
  bn: 'বাংলা',
  id: 'Bahasa Indonesia',
  cn: '中文',
  pt: 'Português',
} as const;

export type SupportedLanguageCode = keyof typeof supportedLanguagesMap;

export type SharedI18nConfig = {
  supportedLangs: SupportedLanguageCode[];
  fallbackLang: SupportedLanguageCode;
};

export const supportedLanguageCodes = Object.keys(supportedLanguagesMap) as SupportedLanguageCode[];

export const fallbackLanguageCode = 'en' as SupportedLanguageCode;

export const i18nConfig: SharedI18nConfig = {
  supportedLangs: supportedLanguageCodes,
  fallbackLang: 'en',
};
