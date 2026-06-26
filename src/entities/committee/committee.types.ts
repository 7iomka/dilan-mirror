import type { SupportedLanguageCode } from '@/shared/config/i18n-config';

type SocialType = 'vk' | 'facebook' | 'instagram' | 'telegram' | 'twitter' | 'linkedin';

export interface CommitteeSocialDto {
  url: string;
  type: SocialType;
}

export interface CommitteeMember {
  id: number;
  photoPreview: null | string;
  photo: string;
  city: string;
  status: 'confirmed' | null;
  priority: null | number;
  rejectComment: null;
  links: CommitteeSocialDto[];
  createdAt: string;
  updatedAt: string;
  userId: number;
  country: string;
  name: string;
  surname: string;
}

export interface GetCommitteeMembersRequestParams {
  language: SupportedLanguageCode;
}

export interface GetCommitteeMembersResponseDto {
  message: 'success';
  status: boolean;
  code: 200 | 400;
  data: {
    items: CommitteeMember[];
  };
}
