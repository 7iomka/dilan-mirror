import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface IndicatorsSectionProps {
  className?: string;
}

const IndicatorsSection = ({ className }: IndicatorsSectionProps) => {
  const { t } = useTranslation();

  const data = useMemo(
    () => ({
      items: [
        {
          value: 59,
          unit: '%',
          title: t('indicators.item1Title'),
        },
        {
          value: 847,
          unit: 'k',
          title: t('indicators.item2Title'),
        },
        {
          value: 3,
          unit: 'm',
          title: t('indicators.item3Title'),
        },
      ],
      limitationText: t('indicators.limitationText'),
      proposalText: t('indicators.proposalText'),
    }),
    [t],
  );

  return (
    <section id="indicators" className={className}>
      <div className="container">
        <div className="px-15 py-50 md:py-70 lg:py-88 lg:px-88 bg-[#30333a] shadow-[0px_1.25rem_8.75rem_rgba(0,0,0,0.25)]">
          <div className="row gx-5 sm:gx-24 flex-nowrap justify-between">
            {data.items.map(({ value, unit, title }, idx) => (
              <div className="col-4 lg:col-auto" key={idx}>
                <div className="lg:w-240">
                  <div className="flex items-end">
                    <div className="text-40px md:text-72px font-bold leading-1">{value}</div>
                    <div className="text-xl md:text-40px font-bold ml-3">{unit}</div>
                  </div>
                  <div className="mt-12 md:mt-16 text-xs md:text-lg [text-wrap:balance]">
                    {title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-56 md:py-88 border-b border-b-[#676c79]">
          <div className="row gy-24">
            <div className="col-12 md:col-6">
              <div className="text-md md:text-xl lg:text-2xl">{data.limitationText}</div>
            </div>
            <div className="col-12 md:col-6">
              <div className="text-md md:text-xl lg:text-2xl">{data.proposalText}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export type { IndicatorsSectionProps };
export { IndicatorsSection };
