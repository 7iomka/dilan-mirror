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

export const abbreviateNumber = (
  num: number,
): {
  value: number;
  suffix: string;
} => {
  if (num < 1000) {
    return { value: num, suffix: '' };
  }
  if (num < 1000000) {
    const thousands = Math.floor(num / 1000);
    return { value: thousands, suffix: 'k' };
  }
  const millions = Math.floor(num / 1000000);
  return { value: millions, suffix: 'M' };
};
