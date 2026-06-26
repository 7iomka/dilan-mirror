import clsx from 'clsx';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Socials } from '@/widgets/socials';
import { Icon, isIconExist } from '@/shared/ui/icon';
import { capitalizeFirst } from '@/shared/lib/is-number-like';
import type { CoverageMapItem } from './coverage-section.data';
import { contactLinkMapping, mapSocialsToItems } from './coverage-section.lib';

interface CoverageAsideProps {
  className?: string;
  selectedPoint: CoverageMapItem | null;
}

const CoverageAside = memo(({ className, selectedPoint }: CoverageAsideProps) => {
  const { t } = useTranslation();

  const data = {
    country: t('coverage.country', 'Country'),
    city: t('coverage.city', 'City'),
    address: t('coverage.address', 'Address'),
    socials: t('coverage.socials', 'Socials'),
    contacts: t('coverage.contacts', 'Contacts'),
    noSelectedPointMessage: t(
      'coverage.noSelectedPointMessage',
      'Select a point on the map to see the details.',
    ),
  };

  return (
    <div
      className={clsx('relative overflow-hidden border-b md:border-r-2 border-inherit', className)}
    >
      <div className="absolute w-[600px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [background-image:radial-gradient(50%_50%_at_50%_50%,_#0C2D23_0%,_rgba(12,45,35,0)_100%)] " />
      <div className="relative z-10 h-full p-20 bg-dark-900/30">
        {selectedPoint ? (
          <div className="flex flex-col gap-y-8 text-sm">
            <h3 className="text-xl">{selectedPoint.title}</h3>
            <hr className="border-t-dark-400 h-1 my-5" />
            <p>
              <strong>{data.country}:</strong> {selectedPoint.country}
            </p>
            <p>
              <strong>{data.city}:</strong> {selectedPoint.city}
            </p>
            <p>
              <strong>{data.address}:</strong> {selectedPoint.address}
            </p>
            <hr className="border-t-dark-400 h-1 my-5" />
            <div className="flex items-center gap-6">
              <h4>{data.socials}:</h4>
              <Socials items={mapSocialsToItems(selectedPoint.socials)} />
            </div>

            {selectedPoint.contacts.length > 0 ? (
              <>
                <hr className="border-t-dark-400 h-1 my-5" />
                <h4>{data.contacts}:</h4>
                {selectedPoint.contacts.map((contact, index) => (
                  <div className="pl-12 mt-8" key={index}>
                    <div className="relative font-bold before:w-3 before:h-3 before:absolute before:-left-12 before:inset-y-0 before:my-auto before:rounded-full before:bg-dark-200">
                      {contact.fullName}
                      {contact.fullName}
                    </div>
                    <ul className="flex flex-col gap-y-8 mt-8">
                      {contact.data.map((contactMethod, i) => (
                        <li className="flex items-center gap-8" key={i}>
                          {isIconExist(contactMethod.type) ? (
                            <Icon name={contactMethod.type} />
                          ) : (
                            <strong>${capitalizeFirst(contactMethod.type)}:</strong>
                          )}

                          <a
                            href={contactLinkMapping[contactMethod.type](contactMethod.value)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-light"
                          >
                            {contactMethod.value}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        ) : (
          <div className="flex h-full justify-center items-center text-lg lg:text-xl leading-[1.5] text-center [text-wrap:balance]">
            {data.noSelectedPointMessage}
          </div>
        )}
      </div>
    </div>
  );
});

export type { CoverageAsideProps };
export { CoverageAside };
