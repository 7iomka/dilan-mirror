import clsx from 'clsx';
import type { IconProps } from '@/shared/ui/icon';
import { Icon } from '@/shared/ui/icon';

interface SocialItem {
  name: string;
  url: string;
  iconName: IconProps['name'];
}
const socials: SocialItem[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com',
    iconName: 'instagram',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
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
            className={clsx('shrink-0 text-lg leading-1 hover:text-primary', classNames?.item)}
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
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
