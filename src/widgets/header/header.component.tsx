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
          <div className="ml-20 flex items-center space-x-20">
            <a className="group text-lg hover:text-primary" href="#!">
              <div className="flex">
                <span>{t('actions.account')}</span>
                <Icon
                  name="arrow-right-up"
                  className="ml-6 text-[0.3334em] transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
                />
              </div>
            </a>
            <Socials />
            <LanguageSelect />
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
