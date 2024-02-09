import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/icon';
import { LanguageSelect } from '@/shared/ui/language-select';
import { appConfig } from '@/shared/config/app-config';
import { Socials } from '../socials';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const { t } = useTranslation();
  const currYear = new Date().getFullYear();
  const yearRange = currYear <= 2024 ? 2024 : `2024 - ${currYear}`;

  const data = {
    allRightsReserved: t('footer.allRightsReserved'),
    yearRange,
    address: t('general.address'),
  };

  return (
    <footer className={clsx('bg-black py-24 lg:py-36', className)}>
      <div className="flex items-center">
        <div className="container">
          <div className="flex items-center justify-between">
            <img
              className="shrink-0 h-36 w-85 lg:w-120 lg:h-50"
              src="/static/images/logo/logo-light.svg"
              alt=""
            />
            <div className="ml-5 md:ml-20 flex items-center">
              <a
                className="group text-lg hover:text-primary order-1 md:order-0 ml-10 md:ml-0"
                aria-label={t('actions.account')}
                href={appConfig.accountURL}
              >
                <div className="flex items-center justify-center p-10 -m-10">
                  <Icon name="account-box" className="text-xl md:hidden" />
                  <span className="hidden md:block">{t('actions.account')}</span>
                  <Icon
                    name="arrow-right-up"
                    className="hidden md:block ml-4 text-[0.667em] transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
                  />
                </div>
              </a>
              <Socials className="ml-5 md:ml-20" />
              <LanguageSelect className="ml-10 md:ml-20" />
            </div>
          </div>
          <hr className="border-t-gray-900 my-24" />
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="grow min-w-[12rem]">
              <div className="text-sm xl:text-lg text-gray-400">
                Copyright {data.yearRange} {appConfig.brandName}. {data.allRightsReserved}
                <br />
                {data.address}
              </div>
            </div>
            <div className="mt-20 lg:mt-0 lg:ml-30 lg:shrink-0 xl:ml-50">
              <div className="overflow-hidden">
                <div className="-mr-18 -mb-12 xl:-mr-30 xl:-mb-18">
                  <div className="flex flex-wrap items-center">
                    <div className="w-full md:hidden" />
                    <div className="pr-18 pb-12 xl:pr-30 xl:pb-18">
                      <a
                        className="text-sm xl:text-lg text-gray-400 hover:text-primary"
                        href={`mailto:${appConfig.email}`}
                      >
                        {appConfig.email}
                      </a>
                    </div>
                    <div className="pr-18 pb-12 xl:pr-30 xl:pb-18">
                      <a
                        className="text-sm xl:text-lg text-gray-400 hover:text-primary"
                        href={`tel:${appConfig.phone.replace(' ', '')}`}
                      >
                        {appConfig.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export type { FooterProps };
export { Footer };
