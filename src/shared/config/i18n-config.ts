export const supportedLanguagesMap = {
  // Add more languages here
  // ar: "العربية",
  en: 'English',
  // es: "Español",
  // fr: "Français",
  // ja: "日本語",
  // pt: "Português",
  ru: 'Русский',
  // no: "Norsk",
  // pl: "Polski",
  // "zh-hans": "简体中文",
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
