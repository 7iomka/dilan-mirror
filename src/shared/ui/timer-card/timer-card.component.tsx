import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './timer-card.module.css';

interface TimerCardTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerCardLabels {
  days: ReactNode;
  hours: ReactNode;
  minutes: ReactNode;
  seconds: ReactNode;
}

interface TimerCardProps {
  time: TimerCardTime;
  labels: TimerCardLabels;
  className?: string;
  title?: ReactNode;
}

interface TimerCardShellProps {
  children: ReactNode;
  className?: string;
}

interface OrbitalUnitProps {
  value: number;
  max: number;
  label: ReactNode;
  accent: string;
}

const OrbitalUnit = ({ value, max, label, accent }: OrbitalUnitProps) => {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference * (1 - (max > 0 ? value / max : 0));

  return (
    <div className={styles.unit}>
      <div className={styles.orbit}>
        <svg viewBox="0 0 100 100" className={styles.ring} aria-hidden="true">
          <circle className={styles.ringBg} cx="50" cy="50" r="42" />
          <circle
            className={styles.ringProgress}
            cx="50"
            cy="50"
            r="42"
            style={{
              stroke: accent,
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>

        <div className={styles.valueWrap}>
          <span key={value} className={styles.value}>
            {pad(value)}
          </span>
        </div>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

const TimerCardShell = ({ children, className }: TimerCardShellProps) => (
  <div className={clsx(styles.container, className)}>
    <div className={styles.aurora} />
    <div className={styles.glow} />
    {children}
  </div>
);

const TimerCard = ({ time, labels, className, title }: TimerCardProps) => (
  <TimerCardShell className={className}>
    {title && <div className={styles.title}>{title}</div>}

    <div className={styles.timer}>
      <OrbitalUnit
        value={time.days}
        max={Math.max(time.days, 1000)}
        label={labels.days}
        accent="#34d399"
      />
      <OrbitalUnit value={time.hours} max={24} label={labels.hours} accent="#2dd4bf" />
      <OrbitalUnit value={time.minutes} max={60} label={labels.minutes} accent="#22d3ee" />
      <OrbitalUnit value={time.seconds} max={60} label={labels.seconds} accent="#38bdf8" />
    </div>
  </TimerCardShell>
);

function pad(value: number) {
  return value.toString().padStart(2, '0');
}

export type { TimerCardLabels, TimerCardProps, TimerCardTime };
export { TimerCard };
