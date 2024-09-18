import clsx from 'clsx';
import { useCallback, useState, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CoverageAside } from './coverage-aside';

const CoverageMap = lazy(() =>
  import(`./coverage-map`).then((mod) => ({ default: mod.CoverageMap })),
);

interface CoverageSectionProps {
  className?: string;
}

const CoverageSection = ({ className }: CoverageSectionProps) => {
  const { t } = useTranslation();

  const data = {
    title: t('coverage.title', 'Global coverage'),
  };

  const [selectedPoint, setSelectedPoint] = useState<any | null>(null);

  const handleSelectPoint = useCallback((pointData: any) => {
    setSelectedPoint(pointData);
  }, []);

  return (
    <section id="coverage" className={clsx('py-56 md:py-88 bg-dark-500', className)}>
      <div className="container">
        <h2 className="text-40px md:text-56px whitespace-pre-wrap text-center">{data.title}</h2>
      </div>
      <div className="mt-24 lg:mt-56 ">
        <div className="container">
          <div className="grid md:grid-cols-[280px_minmax(0,1fr)] border-2 border-dark-700">
            <CoverageAside selectedPoint={selectedPoint} />
            <div className="relative aspect-w-16 aspect-h-11 -order-1 md:order-0">
              <CoverageMap onSelectPoint={handleSelectPoint} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export type { CoverageSectionProps };
export { CoverageSection };
