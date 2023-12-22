import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface IntroSectionProps {
  className?: string;
}

const IntroSection = ({ className }: IntroSectionProps) => {
  const { t } = useTranslation();

  const data = useMemo(
    () => ({
      proposalText: t('intro.proposalText'),
    }),
    [t],
  );

  return (
    <section id="intro" className={clsx('relative bg-dark-500', className)}>
      <div className="container">
        <div className="py-56 md:py-88">
          <div className="text-md md:text-xl lg:text-2xl whitespace-pre-wrap">
            {data.proposalText}
          </div>
        </div>
        <hr className="border-t-dark-300" />
      </div>
    </section>
  );
};

export type { IntroSectionProps };
export { IntroSection };
