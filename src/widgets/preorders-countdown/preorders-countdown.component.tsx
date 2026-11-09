import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TimerCard } from '@/shared/ui/timer-card';
import styles from './preorders-countdown.module.css';

const PREORDERS_OPEN_AT = '2026-12-26T08:00:00Z';

interface PreordersCountdownProps {
  className?: string;
}

const PreordersCountdown = ({ className }: PreordersCountdownProps) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(PREORDERS_OPEN_AT));
  const isComplete = timeLeft.total <= 0;
  const preordersStartedText = t('preorders.title', 'Pre-orders open!');
  const goToTheShopText = t('preorders.description', 'Go to the shop ➔');

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeLeft(PREORDERS_OPEN_AT);
      setTimeLeft(updated);

      if (updated.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) {
    return (
      <div className={clsx(styles.complete, className)}>
        <a href="https://dilan-mirrors.com" target="_blank" rel="noreferrer">
          {preordersStartedText}{' '}
          <span className="underline underline-offset-4 decoration-[0.5px] hover:text-primary-light">
            {goToTheShopText}
          </span>
        </a>
      </div>
    );
  }

  return (
    <TimerCard
      className={clsx('w-[370px] max-w-full', className)}
      time={timeLeft}
      title={t('preorders.countdown.label', 'Pre-orders open in:')}
      labels={{
        days: t('preorders.countdown.days', 'Days'),
        hours: t('preorders.countdown.hours', 'Hours'),
        minutes: t('preorders.countdown.minutes', 'Minutes'),
        seconds: t('preorders.countdown.seconds', 'Seconds'),
      }}
    />
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

export type { PreordersCountdownProps };
export { PreordersCountdown };
