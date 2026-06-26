import type { SupportedLanguageCode } from '@/shared/config/i18n-config';

export interface GetNewsRequestParams {
  limit: number;
  language: SupportedLanguageCode;
  page: number;
}

export interface NewsItem {
  id: number | string;
  attachments: any[];
  shortDescription: {
    content: string | null;
    language: SupportedLanguageCode;
  }[];
  title: {
    content: string | null;
    language: SupportedLanguageCode;
  }[];
  header: {
    content: string | null;
    language: SupportedLanguageCode;
  }[];
  content?: {
    content: string | null;
    language: SupportedLanguageCode;
  }[];
  influencedProjectIds: number[];
  isActive: boolean;
  isSharePriceChanged: boolean;
  isUserLikedIt: boolean | null;
  likesCount: number;
  viewsCount: number;
  metadata: {
    mainImg: string;
  };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsDto {
  message: 'success';
  status: boolean;
  code: 200 | 400;
  data: {
    items: NewsItem[];
    metadata: {
      total: number;
      limit: number;
      page: number;
    };
  };
}

export interface GetNewsItemDetailsRequestParams {
  id: number | string;
  language: SupportedLanguageCode;
}
export interface NewsItemDetailsDto {
  message: 'success';
  status: boolean;
  code: 200 | 400;
  data: NewsItem;
}
