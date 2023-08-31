/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import { formatNumber } from '@/shared/lib/formatting';

interface FormattedNumberProps {
  className?: string;
  value: number;
  suffix?: ReactNode;
  formatter?: Formatter;
  withSuffix?: boolean;
}

type Formatter = 'price' | ((value: number) => string);

const FormattedNumber = ({
  formatter,
  value,
  suffix,
  className,
  withSuffix = true,
}: FormattedNumberProps) => {
  let formattedValue: string | number = value;
  let suffixValue = suffix;

  // Use common number formatter by default
  if (!formatter) {
    formattedValue = formatNumber(value);
  } else if (formatter === 'price') {
    formattedValue = formatNumber(value, { decimals: 2 });
    // add fallback suffix for price formatter
    if (typeof suffixValue === 'undefined') {
      suffixValue = '₽';
    }
  } else if (typeof formatter === 'function') {
    formattedValue = formatter(value);
  }

  const formattedSuffix =
    suffixValue && withSuffix ? <span className="ml-[0.24em]">{suffixValue}</span> : null;

  return (
    <div className={className}>
      {formattedValue}
      {formattedSuffix}
    </div>
  );
};

export type { FormattedNumberProps };
export { FormattedNumber };
