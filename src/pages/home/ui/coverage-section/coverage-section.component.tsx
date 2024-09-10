import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const CoverageMap = await import(`./coverage-map`).then((mod) => mod.CoverageMap);

interface CoverageSectionProps {
  className?: string;
}

const CoverageSection = ({ className }: CoverageSectionProps) => {
  const { t } = useTranslation();

  const data = {
    title: t('coverage.title', 'Global coverage'),
  };

  return (
    <section id="coverage" className={clsx('py-56 md:py-88 bg-dark-500', className)}>
      <div className="container">
        <h2 className="text-40px md:text-56px whitespace-pre-wrap text-center">{data.title}</h2>
      </div>
      <div className="mt-24 lg:mt-56 overflow-hidden">
        <div className="container">
          <CoverageMap />
        </div>
      </div>
    </section>
  );
};

export type { CoverageSectionProps };
export { CoverageSection };
