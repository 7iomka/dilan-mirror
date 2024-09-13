import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Socials } from '@/widgets/socials';
import { mapSocialsToItems } from './coverage-section.lib';

const CoverageMap = await import(`./coverage-map`).then((mod) => mod.CoverageMap);

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
            <div className="p-20 bg-dark-600 border-b md:border-r-2 border-inherit">
              {selectedPoint ? (
                <div>
                  <h3>{selectedPoint.title}</h3>
                  <p>
                    <strong>Country:</strong> {selectedPoint.country}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedPoint.city}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedPoint.address}
                  </p>

                  <h4>Socials:</h4>
                  <Socials items={mapSocialsToItems(selectedPoint.socials)} />

                  <h4>Contacts:</h4>
                  {selectedPoint.contacts.map((contact: any, index: number) => (
                    <div key={index}>
                      <p>
                        <strong>{contact.fullName}</strong>
                      </p>
                      <ul>
                        {contact.data.map((contactMethod: any, i: number) => (
                          <li key={i}>
                            <strong>{contactMethod.type}:</strong> {contactMethod.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Select a point on the map to see the details.</p>
              )}
            </div>
            <div className="relative aspect-w-16 aspect-h-11">
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
