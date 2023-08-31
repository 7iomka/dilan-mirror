import type { Options as WNumbOptions } from 'wnumb';
import wNumb from 'wnumb';

export const formatNumber = (value?: number, options?: WNumbOptions): string => {
  if (typeof value === 'undefined') return '';

  return wNumb({
    mark: '.',
    thousand: ' ',
    ...(options || {}),
  }).to(value);
};

export const unmaskPhoneNumber = (value: string): string => {
  return value.replace(/[^\d+]/g, '');
};
