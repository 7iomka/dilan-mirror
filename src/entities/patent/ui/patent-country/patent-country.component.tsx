import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { Icon } from '@/shared/ui/icon';
import { Flag } from '@/shared/ui/flag';
import type { Patent } from '../../patent.types';

interface PatentCountryProps {
  className?: string;
  data: Patent;
  onClick?: (code: string) => void;
}

const PatentCountry = ({ className, data, onClick }: PatentCountryProps) => {
  const { t } = useTranslation();
  const { code, status } = data;
  const isFuture = status === null;
  const isPending = status === 'pending';
  const isFutureOrPending = isFuture || isPending;

  const handleClick = useCallback(() => {
    if (isFuture) return;
    onClick?.(code);
  }, [isFuture, code, onClick]);

  return (
    <button
      type="button"
      className={clsx(
        'group flex flex-col items-center text-center',
        { 'is-future-or-pending': isFutureOrPending },
        { 'is-clickable': !isFuture },
        { 'cursor-default': isFuture },
        className,
      )}
      onClick={handleClick}
    >
      <Flag
        code={code}
        className="w-56 h-56 md:w-80 md:h-80"
        withOverlay={isFutureOrPending}
        overlayOpacity={isPending ? 0.4 : 0.7}
      >
        <div
          data-status
          className={clsx(
            'absolute right-0 top-0 p-3 rounded-full flex items-center justify-center',
            isFutureOrPending ? 'bg-dark-500' : 'bg-primary-pale',
          )}
        >
          <Icon
            name={isFuture ? 'time' : isPending ? 'hourglass' : 'shield-check-line'}
            className={clsx(
              'w-12 h-12 md:w-20 md:h-20',
              isFuture ? 'text-dark-200' : isPending ? 'text-white/80' : 'text-white',
            )}
          />
        </div>
      </Flag>
      <h5
        data-title
        className={clsx(
          'text-sm md:text-md font-normal mt-15 transition-colors max-w-full truncate',
          'group-[.is-future-or-pending]:opacity-80 [.group.is-clickable:hover_&]:text-primary',
        )}
      >
        {t(`country.${code}`, t(`region.${code}`))}
      </h5>
    </button>
  );
};

export type { PatentCountryProps };
export { PatentCountry };
