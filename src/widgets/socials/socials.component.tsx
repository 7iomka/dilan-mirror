import clsx from 'clsx';
import type { IconProps } from '@/shared/ui/icon';
import { Icon } from '@/shared/ui/icon';
import { appConfig } from '@/shared/config/app-config';

interface SocialItem {
  name: string;
  url: string;
  iconName: IconProps['name'];
}
const socials: SocialItem[] = [
  {
    name: 'Instagram',
    url: appConfig.instagramURL,
    iconName: 'instagram',
  },
  {
    name: 'Facebook',
    url: appConfig.facebookURL,
    iconName: 'facebook',
  },
];

interface SocialsProps {
  className?: string;
  classNames?: {
    root?: string;
    item?: string;
    icon?: string;
  };
  items?: SocialItem[];
}

const Socials = ({ className, classNames, items = socials }: SocialsProps) => {
  return (
    <div className={clsx('flex items-center space-x-10', className, classNames?.root)}>
      {items.map((item) => {
        return (
          <a
            className={clsx(
              'flex items-center justify-center shrink-0 text-xl hover:text-primary',
              classNames?.item,
            )}
            key={item.name}
            aria-label={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className={clsx(classNames?.icon)} name={item.iconName} />
          </a>
        );
      })}
    </div>
  );
};

export type { SocialsProps };
export { Socials };
