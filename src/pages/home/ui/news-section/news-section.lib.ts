import { $$i18n } from '@/shared/i18n';
import { fallbackLanguageCode } from '@/shared/config/i18n-config';
import type { NewsItem } from './news-section.types';

export const getTranslatedValue = <T extends { language: string; content: string | null }[]>(
  v: T | undefined,
) => {
  if (!v) return null;

  const byLang = v.find((item) => item.language === $$i18n.i18n.language);
  const byFallbackLang = v.find((item) => item.language === fallbackLanguageCode)!;
  return byLang ?? byFallbackLang;
};

export const normalizeNewsItem = (item: NewsItem) => {
  const {
    id,
    title,
    shortDescription,
    metadata: { mainImg },
    publishedAt: publishedAtString,
    content,
  } = item;

  const localeSettings: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const publishedAt = new Date(publishedAtString);

  return {
    id,
    title: getTranslatedValue(title)?.content,
    shortDescription: getTranslatedValue(shortDescription)?.content,
    mainImg,
    publishedDate: publishedAt.toLocaleDateString($$i18n.i18n.language, localeSettings),
    content: getTranslatedValue(content)?.content,
  };
};

export type NewsItemNormalized = ReturnType<typeof normalizeNewsItem>;

export const NEWS_ITEM_MODAL_ID = 'news_item';

export const getDynamicTail = () => {
  const now = new Date();
  const minutes = Math.floor(now.getMinutes() / 5) * 5;
  now.setMinutes(minutes, 0, 0);

  return now
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 12);
};
