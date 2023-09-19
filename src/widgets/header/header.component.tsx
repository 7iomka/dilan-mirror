import Sticky from 'react-sticky-el';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '@/shared/ui/language-select';
import { Icon } from '@/shared/ui/icon';
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
          <Icon name="logo" className="shrink-0 w-120 h-24 lg:w-154 lg:h-32" />
          <div className="ml-20 flex items-center">
            <a
              className="group text-lg hover:text-primary order-1 md:order-0 ml-10 md:ml-0"
              href="#!"
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
            <Socials className="ml-15 md:ml-20" />
            <LanguageSelect className="ml-15 md:ml-20" />
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
    <header className={clsx('relative z-[100]', className)}>
      <Sticky topOffset={100} stickyClassName="is-sticky">
        <HeaderBase />
      </Sticky>
    </header>
  );
};

export type { HeaderProps };
export { Header, StickyHeader };
