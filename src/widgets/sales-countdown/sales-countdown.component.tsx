import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import styles from './sales-countdown.module.css';

interface SalesCountdownProps {
  className?: string;
  hideZero?: boolean;
}

const SalesCountdown = ({ className, hideZero = false }: SalesCountdownProps) => {
  const label = t('sales.countdown.label', 'Sales starts in:');
  const targetDate = '2025-05-01T12:00:00+00:00';
  const salesStartedText = t('sales.title', `Sales have started!`);
  const goToTheShopText = t('sales.description', `Go to the shop ➔`);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  // const isComplete = timeLeft.total <= 0;
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
        <a
          href="https://dilan-mirrors.com"
          target="_blank"
          style={{
            filter: 'brightness(1.5)',
          }}
          rel="noreferrer"
        >
          {salesStartedText}{' '}
          <span className="underline underline-offset-4 decoration-[0.5px] group-hover:text-primary-light">
            {goToTheShopText}
          </span>
        </a>
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
    <div className={clsx(styles.salesCountdown, className)}>
      <span className={styles.saleCountdown__label}>{label}</span>{' '}
      <span className={styles.salesCountdown__digits}>{parts.join(' : ')}</span>
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
