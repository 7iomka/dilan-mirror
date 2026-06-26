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

export const getDynamicTail = () => {
  const now = new Date();
  const minutes = Math.floor(now.getMinutes() / 5) * 5;
  now.setMinutes(minutes, 0, 0);

  return now
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 12);
};
