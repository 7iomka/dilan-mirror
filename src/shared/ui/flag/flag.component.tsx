import type { ReactNode } from 'react';
import { useMemo } from 'react';
import clsx from 'clsx';
import { appConfig } from '@/shared/config/app-config';

interface FlagProps {
  className?: string;
  code: string;
  children?: ReactNode;
  withOverlay?: boolean;
  overlayOpacity?: number;
}

const Flag = ({ className, code, children, withOverlay, overlayOpacity = 0.6 }: FlagProps) => {
  const src = useMemo(() => {
    const supportedCountryCode = appConfig.supportedCountryCodesMap[code];
    const supportedRegionCode = appConfig.supportedRegionCodesMap[code];
    if (!supportedCountryCode && !supportedRegionCode) return `/static/images/no-image.svg`;

    if (supportedRegionCode) {
      return `/static/images/flags/regions/${supportedRegionCode}.svg`;
    }
    return `/static/images/flags/countries/${supportedCountryCode}.svg`;
  }, [code]);

  return (
    <div className={clsx('relative', className)} data-flag>
      <img alt={code} className="w-full h-full rounded-full" src={src} />
      {withOverlay && (
        <div
          className="absolute -inset-1 rounded-full bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children}
    </div>
  );
};

export type { FlagProps };
export { Flag };
