import { appConfig } from '@/shared/config/app-config';
import type { Patent, PatentDto } from './patent.types';

export const patentCountryCodes = Object.keys(appConfig.supportedCountryCodesMap);

export const getMappedPatent = ({ code, pdf, status, url }: PatentDto): Patent => {
  return {
    code,
    pdf,
    status: status ? (status.toLowerCase() as Patent['status']) : null,
    url,
  };
};
