import type { SupportedLanguageCode } from '@/shared/config/i18n-config';

export type NewsSort =
  | 'publishedAt,desc'
  | 'publishedAt,asc'
  | 'title,asc'
  | 'title,desc'
  | 'readingTime,asc'
  | 'readingTime,desc';

export interface NewsCategoryDto {
  id: number;
  slug: string;
  name: string;
}

export interface NewsTagDto {
  id: number;
  slug: string;
  name: string;
}

export interface NewsThumbnailDto {
  imageUrl: string;
  thumbnailUrl: string;
  originalFilename: string;
  altText: string;
  caption: string;
  isMain: boolean;
  orderIndex: number;
}

export interface NewsListItemDto {
  id: number;
  slug: string;
  publishedAt: string;
  readingTime: number;
  title: string;
  excerpt: string;
  thumbnailUrl: string;
  thumbnail: NewsThumbnailDto | null;
  categories: NewsCategoryDto[];
  tags: NewsTagDto[];
}

export interface NewsListResponseDto {
  page: number;
  size: number;
  total: number;
  pages: number;
  items: NewsListItemDto[];
}

export interface NewsDetailImageDto {
  imageUrl: string;
  thumbnailUrl: string;
  originalFilename: string;
  altText: string;
  caption: string;
  isMain: boolean;
  orderIndex: number;
}

export interface NewsDetailMetaDto {
  title: string;
  description: string;
  keywords: string;
  socialTitle: string;
  socialDescription: string;
}

export interface NewsDetailDto {
  id: number;
  slug: string;
  publishedAt: string;
  readingTime: number;
  title: string;
  excerpt: string;
  content: string;
  categories: NewsCategoryDto[];
  tags: NewsTagDto[];
  images: NewsDetailImageDto[];
  meta: NewsDetailMetaDto;
}

export interface GetNewsRequestParams {
  lang: SupportedLanguageCode;
  page: number;
  size: number;
  sort?: NewsSort;
  q?: string;
  categorySlugs?: string[];
}

export interface GetNewsItemDetailsRequestParams {
  slug: string;
  lang: SupportedLanguageCode;
}
