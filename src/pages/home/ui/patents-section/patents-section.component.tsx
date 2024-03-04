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
            </div>
          </div>
          <p className="text-xl text-center mt-16 xsl:hidden [text-wrap:balance]">
            {data.description}
          </p>
        </div>
      </div>
      <div className="mt-56">
        <div className="container">
          <ConfirmedPatentsList />
        </div>
      </div>
      <div className="mt-56">
        <div className="container">
          <FutureAndPendingPatents />
        </div>
      </div>
      <PatentDetailsModal />
    </section>
  );
};

const FutureAndPendingPatents = () => {
  const { t } = useTranslation();
  const items = useUnit($$patentsSection.$futureAndPendingItems);
  const handleItemClick = useUnit($$patentsSection.openDetailsByCountryCodeTriggered);

  return (
    <PatentCountryList
      items={items}
      title={t('patents.pending.title', 'Patents in the validation process')}
      onItemClick={handleItemClick}
    />
  );
};
const ConfirmedPatentsList = () => {
  const { t } = useTranslation();
  const items = useUnit($$patentsSection.$confirmedItems);
  const handleItemClick = useUnit($$patentsSection.openDetailsByCountryCodeTriggered);

  return (
    <PatentCountryList
      items={items}
      title={t('patents.granted.title', 'Granted patents')}
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
          <div className="flex items-center">
            <Flag code={item.code} className="w-20 h-20 " />
            <h5 data-title className="text-lg max-w-full truncate ml-12">
              {t(`country.${item.code}`, t(`region.${item.code}`))}
            </h5>
          </div>
          <div className="relative mt-30">
            <img src={item.url!} className={clsx('w-full h-auto')} alt="" />
            <Button
              className="absolute right-0 bottom-0 min-w-[11rem] flex items-center justify-center"
              component="a"
              href={item.pdf ?? '#!'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="pdf-file" className="text-xl" />
              <span className="ml-8">{data.modal.downloadButtonText}</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export type { PatentsSectionProps };
export { PatentsSection };
