import { $$i18n } from '@/shared/i18n';
import { appConfig } from '@/shared/config/app-config';
import type {
  GetNewsRequestParams,
  NewsDetailDto,
  NewsDetailImageDto,
  NewsListItemDto,
} from './news-section.types';

export const DEFAULT_NEWS_SECTION_QUERY: GetNewsRequestParams = {
  lang: $$i18n.i18n.language as GetNewsRequestParams['lang'],
  page: 0,
  size: 999,
  sort: 'publishedAt,desc',
  categorySlugs: ['patents'],
};

const pickMainImage = (
  thumbnail: NewsListItemDto['thumbnail'],
  images: NewsDetailImageDto[] = [],
) => {
  if (thumbnail && thumbnail.imageUrl) {
    return `${appConfig.apiNewsBaseURL}${thumbnail.imageUrl}`;
  }

  const mainImage = images.find((item) => item.isMain) ?? images[0];
  return mainImage?.imageUrl ? `${appConfig.apiNewsBaseURL}${mainImage.imageUrl}` : '';
};

const formatPublishedDate = (publishedAt: string) => {
  if (!publishedAt) {
    return '';
  }

  return new Date(publishedAt).toLocaleDateString($$i18n.i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const normalizeNewsListItem = (item: NewsListItemDto) => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  shortDescription: item.excerpt,
  mainImg: pickMainImage(item.thumbnail),
  publishedDate: formatPublishedDate(item.publishedAt),
  content: null as string | null,
  categories: item.categories,
  tags: item.tags,
});

export const normalizeNewsDetail = (item: NewsDetailDto) => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  shortDescription: item.excerpt,
  mainImg: pickMainImage(null, item.images),
  publishedDate: formatPublishedDate(item.publishedAt),
  content: item.content,
  categories: item.categories,
  tags: item.tags,
  meta: item.meta,
  images: item.images,
});

export type NewsListItemNormalized = ReturnType<typeof normalizeNewsListItem>;
export type NewsDetailNormalized = ReturnType<typeof normalizeNewsDetail>;

export const NEWS_ITEM_MODAL_ID = 'news_item';

export const resolveCategorySlug = (categorySlugs?: string[]) => {
  return categorySlugs?.find((slug) => slug.trim() !== '') ?? '';
};
