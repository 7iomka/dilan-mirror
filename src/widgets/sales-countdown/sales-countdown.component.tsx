import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { Button } from '@/shared/ui/button';
import styles from './sales-countdown.module.css';

interface SalesCountdownProps {
  className?: string;
  hideZero?: boolean;
}

const SalesCountdown = ({ className, hideZero = false }: SalesCountdownProps) => {
  const label = t('hero.salesCountdown.label', 'Sales starts in:');
  const targetDate = '2025-05-01T12:00:00+00:00';
  const salesStartedText = t('hero.salesCountdown.salesStartedText', `Sales have started!`);

  const goToTheShopText = t('hero.salesCountdown.goToTheShopText', `Go to the shop`);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const isComplete = timeLeft.total <= 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeLeft(targetDate);
      setTimeLeft(updated);

      if (updated.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (isComplete) {
    return (
      <div className={clsx(styles.salesCountdown, className)}>
        <Button
          color="custom"
          size="custom"
          className="text-lg flex flex-wrap gap-6 items-center justify-center min-w-200 text-center py-10 px-15 group"
          component="a"
          href="https://dilan-mirrors.com"
          target="_blank"
        >
          {salesStartedText}{' '}
          <span className="underline underline-offset-4 decoration-[0.5px] group-hover:text-primary-light">
            {goToTheShopText}
          </span>
        </Button>
      </div>
    );
  }

  const { days, hours, minutes, seconds } = timeLeft;

  const parts: string[] = [];

  if (!hideZero || days > 0) parts.push(`${pad(days)}d`);
  if (!hideZero || hours > 0 || parts.length > 0) parts.push(`${pad(hours)}h`);
  if (!hideZero || minutes > 0 || parts.length > 0) parts.push(`${pad(minutes)}m`);
  parts.push(`${pad(seconds)}s`);

  return (
    <div className={clsx(styles.salesCountdown, 'py-10 px-15', className)}>
      <span className="text-xl font-medium">{label}</span>{' '}
      <span className="text-2xl font-bold [font-variant-numeric:tabular-nums] whitespace-nowrap inline-flex w-[240px]">
        {parts.join(' : ')}
      </span>
    </div>
  );
};

function getTimeLeft(target: Date | string) {
  const now = new Date();
  const end = new Date(target);
  const total = Math.max(end.getTime() - now.getTime(), 0);

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

function pad(value: number) {
  return value.toString().padStart(2, '0');
}

export type { SalesCountdownProps };
export { SalesCountdown };
