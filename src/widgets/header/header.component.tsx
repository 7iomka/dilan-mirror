import Sticky from 'react-sticky-el';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '@/shared/ui/language-select';
import { Icon } from '@/shared/ui/icon';
import { appConfig } from '@/shared/config/app-config';
import { Socials } from '../socials';

interface HeaderProps {
  className?: string;
}

const HeaderBase = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center h-60 lg:h-80 transition [.is-sticky_>_&]:bg-black">
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
      </div>
    </div>
  );
};

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={clsx('relative z-[100]', className)}>
      <HeaderBase />
    </header>
  );
};

const StickyHeader = ({ className }: HeaderProps) => {
  return (
    <header className={clsx('sticky-header relative z-[100]', className)}>
      <Sticky topOffset={700} stickyClassName="is-sticky">
        <HeaderBase />
      </Sticky>
    </header>
  );
};

export type { HeaderProps };
export { Header, StickyHeader };
