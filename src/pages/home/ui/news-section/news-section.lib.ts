import { $$i18n } from '@/shared/i18n';
import { fallbackLanguageCode } from '@/shared/config/i18n-config';
import type { NewsItemDto } from './news-section.types';

export const getTranslatedValue = <T extends { language: string; content: string | null }[]>(
  v: T,
) => {
  const byLang = v.find((item) => item.language === $$i18n.i18n.language);
  const byFallbackLang = v.find((item) => item.language === fallbackLanguageCode)!;
  return byLang ?? byFallbackLang;
};

export const normalizeNewsItem = (item: NewsItemDto) => {
  const {
    id,
    title,
    shortDescription,
    metadata: { mainImg },
    publishedAt: publishedAtString,
  } = item;

  const localeSettings: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const publishedAt = new Date(publishedAtString);

  return {
    id,
    title: getTranslatedValue(title).content,
    shortDescription: getTranslatedValue(shortDescription).content,
    mainImg,
    publishedDate: publishedAt.toLocaleDateString($$i18n.i18n.language, localeSettings),
  };
};

export type NewsItemNormalized = ReturnType<typeof normalizeNewsItem>;
