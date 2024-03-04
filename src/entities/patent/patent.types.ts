import type { SupportedLanguageCode } from '@/shared/config/i18n-config';

export interface GetPatentsRequestParams {
  language: SupportedLanguageCode;
}

export interface PatentDto {
  pdf: string;
  url: string;
  code: string;
  status: 'CONFIRMED' | 'PENDING';
}

export interface GetPatentsResponseDto {
  message: 'success';
  status: boolean;
  code: 200 | 400;
  data: {
    about: {
      patents: PatentDto[];
    };
  };
}

export interface Patent {
  pdf: string | null;
  url: string | null;
  code: string;
  status: 'confirmed' | 'pending' | null;
}
