import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { abbreviateNumber } from '@/shared/lib/formatting';

interface IndicatorsSectionProps {
  className?: string;
}

const IndicatorsSection = ({ className }: IndicatorsSectionProps) => {
  const { t } = useTranslation();

  const percentage = useMemo(() => {
    const currentDate = new Date();
    const startDate = new Date(2023, 1, 20);
    const futureDate = new Date(2024, 6, 20);

    const diff = futureDate.getTime() - currentDate.getTime();
    const allTime = futureDate.getTime() - startDate.getTime();
    const result = (diff / allTime) * 100;

    return result.toFixed(2);
  }, []);

  const data = useMemo(
    () => ({
      items: [
        {
          value: percentage,
          unit: '%',
          title: t('indicators.item1Title'),
        },
        {
          value: abbreviateNumber(0).value,
          unit: abbreviateNumber(0).suffix,
          isCost: true,
          title: t('indicators.item2Title'),
        },
        {
          value: abbreviateNumber(14).value,
          unit: abbreviateNumber(14).suffix,
          title: t('indicators.item3Title'),
        },
      ],
      limitationText: t('indicators.limitationText'),
      proposalText: t('indicators.proposalText'),
    }),
    [t, percentage],
  );

  return (
    <section id="indicators" className={clsx('relative', className)}>
      <div className="bg-dark-500 absolute left-0 right-0 bottom-0 top-56" />
      <div className="container relative z-[2]">
        <div className="px-15 py-30 md:py-50 md:px-25 lg:py-88 lg:px-60 xl:px-88 bg-[#30333a] shadow-[0px_1.25rem_8.75rem_rgba(0,0,0,0.25)]">
          <div className="row gy-24 gx-5 sm:gx-24 sm:flex-nowrap justify-between">
            {data.items.map(({ value, unit, isCost, title }, idx) => (
              <div className="col-12 sm:col-4" key={idx}>
                <div className="lg:max-w-[25rem]">
                  <div className="flex items-end">
                    <div className="text-40px lg:text-72px font-bold leading-1 flex items-end">
                      {isCost ? (
                        <span className="text-xl lg:text-40px font-bold mr-3 mb-4">$</span>
                      ) : null}
                      {value}
                    </div>
                    {unit && <div className="text-xl lg:text-40px font-bold ml-3">{unit}</div>}
                  </div>
                  <div className="mt-12 lg:mt-16 text-xs lg:text-lg [text-wrap:balance]">
                    {title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-56 md:py-88">
          <div className="row gy-24">
            <div className="col-12 md:col-6">
              <div className="text-md md:text-xl lg:text-2xl whitespace-pre-wrap">
                {data.limitationText}
              </div>
            </div>
            <div className="col-12 md:col-6">
              <div className="text-md md:text-xl lg:text-2xl whitespace-pre-wrap">
                {data.proposalText}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <hr className="border-t-dark-300" />
        </div>
      </div>
    </section>
  );
};

export type { IndicatorsSectionProps };
export { IndicatorsSection };
