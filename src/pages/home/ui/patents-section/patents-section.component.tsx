import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { PatentCountryList } from '@/entities/patent';
import { Flag } from '@/shared/ui/flag';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { $$patentsSection } from './patents-section.model';
import { PATENTS_ITEM_MODAL_ID } from './patents-section.lib';

interface PatentsSectionProps {
  className?: string;
}

const PatentsSection = ({ className }: PatentsSectionProps) => {
  const { t } = useTranslation();

  const data = {
    title: t('patents.title'),
    description: t('patents.description'),
    pctDescription: t('patents.pctDescription', 'PCT patent application submitted'),
    pctDocUrl: 'https://drive.google.com/drive/folders/1i7uHXRGp5VNqelmnjxtZdo91f0aVlJUy',
    pctNote: t('patents.pctNote', 'Read more about PCT'),
    licensesDocUrl: 'https://drive.google.com/drive/folders/1Wcgq1ranUv96vTJgQFFIW6hbmMin2Q4g',
    licenses: t('patents.licenses', 'Licenses'),
  };

  return (
    <section className={clsx('py-56 md:py-88 bg-dark-700', className)}>
      <div>
        <div className="container pb-28 md:pb-40">
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center">
            <div className="shrink-0 relative flex items-center justify-center w-80 h-80 border border-dark-400">
              <Icon name="shield-check" className="text-[3rem] text-primary-pale" />
            </div>
            <div className="mt-8 md:mt-0 md:ml-24 text-center md:text-left">
              <h2 className="text-40px md:text-56px pt-5">{data.title}</h2>
              <p className="text-xl mt-20 hidden xsl:block [text-wrap:balance]">
                {data.description}
              </p>
              <div className="mt-24">
                <div className="inline-flex flex-col sm:flex-row items-center sm:items-stretch justify-center md:justify-start flex-wrap gap-12 text-left">
                  <a
                    href={data.pctDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm md:text-lg hover:underline hover:text-primary underline-offset-2 max-w-200"
                  >
                    <Icon name="file" className="text-xl" />
                    <span className="ml-8 md:ml-12">{t('authorship.showDocumentsActionText')}</span>
                  </a>
                  <a
                    href={data.licensesDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm md:text-lg hover:underline hover:text-primary underline-offset-2 max-w-200"
                  >
                    <Icon name="file" className="text-xl" />
                    <span className="ml-8 md:ml-12">{data.licenses}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl text-center mt-16 xsl:hidden [text-wrap:balance]">
            {data.description}
          </p>
        </div>
      </div>
      <div className="mt-56">
        <div className="container">
          <ActivePatentsList />
        </div>
      </div>
      <div className="mt-56">
        <div className="container">
          <FuturePatents />
        </div>
      </div>
      <PatentDetailsModal />
    </section>
  );
};

const FuturePatents = () => {
  const { t } = useTranslation();
  const items = useUnit($$patentsSection.$futureItems);
  const handleItemClick = useUnit($$patentsSection.openDetailsByCountryCodeTriggered);

  return (
    <PatentCountryList
      items={items}
      title={t('patents.future.title', 'Planned for registration')}
      onItemClick={handleItemClick}
    />
  );
};
const ActivePatentsList = () => {
  const { t } = useTranslation();
  const items = useUnit($$patentsSection.$activeItems);
  const handleItemClick = useUnit($$patentsSection.openDetailsByCountryCodeTriggered);

  return (
    <PatentCountryList
      items={items}
      title={t('patents.grantedOrPending.title', 'Granted or pending patents')}
      onItemClick={handleItemClick}
    />
  );
};

const PatentDetailsModal = () => {
  const item = useUnit($$patentsSection.$activeItem);
  const { t } = useTranslation();
  const data = {
    modal: {
      downloadButtonText: t('patents.modal.download', 'Download'),
    },
  };

  return (
    <div
      id={PATENTS_ITEM_MODAL_ID}
      style={{ display: 'none' }}
      data-selectable="true"
      className="w-[600px] max-w-full text-white bg-dark-500"
    >
      {item !== null && (
        <>
          <div className="flex items-start justify-between mt-10 sm:pt-0">
            <div className="flex items-center">
              <Flag code={item.code} className="w-20 h-20" />
              <h5 data-title className="text-lg max-w-full truncate ml-12">
                {t(`country.${item.code}`, t(`region.${item.code}`))}
              </h5>
            </div>
            <Button
              className="ml-10 min-w-[8rem] text-sm p-5 flex items-center justify-center"
              component="a"
              size="custom"
              href={item.pdf ?? '#!'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="pdf-file" className="text-xl" />
              <span className="ml-8">{data.modal.downloadButtonText}</span>
            </Button>
          </div>
          <div className="relative mt-30">
            <div className="w-full">
              <div className="w-full aspect-w-7 aspect-h-10">
                <img src={item.url!} className={clsx('object-contain object-left-top')} alt="" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export type { PatentsSectionProps };
export { PatentsSection };
