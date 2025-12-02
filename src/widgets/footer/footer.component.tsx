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
  const { t, i18n } = useTranslation();
  const currYear = new Date().getFullYear();
  const yearRange = currYear <= 2024 ? 2024 : `2024 - ${currYear}`;
  const privacyPolicyUrl = `/static/documents/policies/privacy-policy-${i18n.language.toLowerCase()}.pdf`;

  const data = {
    allRightsReserved: t('footer.allRightsReserved'),
    yearRange,
    address: t('general.address'),
    privacyPolicy: t('general.privacyPolicy', 'Privacy policy'),
  };

  return (
    <footer className={clsx('relative bg-black py-24 lg:py-36', className)}>
      <div className={clsx('snow-bg ![--offset:0rem]')} />
      <div className="flex items-center relative">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="relative inline-flex shrink-0">
              <img
                className="h-36 w-85 lg:w-120 lg:h-50"
                src="/static/images/logo/logo-light.svg"
                alt=""
              />
              <img
                className="absolute w-[35%] left-[-12%] top-[-21%] pointer-events-none"
                src="/static/images/logo/santa-hat.png"
                alt=""
              />
            </div>
            <div className="ml-5 md:ml-20 flex items-center">
              <a
                className="group text-lg hover:text-primary order-1 md:order-0 ml-10 md:ml-0"
                aria-label={t('actions.account')}
                href={appConfig.accountURL}
              >
                <div className="flex items-center justify-center p-10 -m-10">
                  <Icon name="login" className="text-xl md:hidden" />
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
                  <div className="flex flex-wrap items-center lg:justify-end">
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
                    <div className="w-full" />
                    <div className="pr-18 pb-12 xl:pr-30 xl:pb-18">
                      <a
                        className="text-sm xl:text-lg text-gray-900 hover:text-primary group flex items-center justify-center"
                        href={privacyPolicyUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span>{data.privacyPolicy}</span>
                        <Icon
                          name="arrow-right-up"
                          className="hidden md:block ml-4 text-[0.667em] transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
                        />
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
