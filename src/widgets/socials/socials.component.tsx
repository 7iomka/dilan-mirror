import clsx from 'clsx';
import type { IconProps } from '@/shared/ui/icon';
import { Icon } from '@/shared/ui/icon';
import { appConfig } from '@/shared/config/app-config';

export interface SocialItem {
  name: string;
  url: string;
  iconName: IconProps['name'];
}
const socials: SocialItem[] = [
  {
    name: 'Youtube',
    url: appConfig.youtubeURL,
    iconName: 'youtube',
  },
  {
    name: 'Instagram',
    url: appConfig.instagramURL,
    iconName: 'instagram',
  },
  {
    name: 'VK',
    url: appConfig.vkURL,
    iconName: 'vk',
  },
  {
    name: 'Telegram',
    url: appConfig.telegramURL,
    iconName: 'telegram',
  },
  // {
  //   name: 'Facebook',
  //   url: appConfig.facebookURL,
  //   iconName: 'facebook',
  // },
  // {
  //   name: 'LinkedIn',
  //   url: appConfig.linkedinURL,
  //   iconName: 'linkedin',
  // },

  // {
  //   name: 'Twitter',
  //   url: appConfig.twitterURL,
  //   iconName: 'twitter',
  // },
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
    <div className={clsx('flex items-center space-x-8', className, classNames?.root)}>
      {items.map((item) => {
        return (
          <a
            className={clsx(
              'flex items-center justify-center shrink-0 w-20 h-20 md:w-30 md:h-30 border border-dark-800 hover:border-dark-700 bg-dark-700 hover:bg-dark-600 text-white',
              classNames?.item,
            )}
            key={item.name}
            aria-label={item.name}
            title={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              className={clsx(classNames?.icon, 'w-12 h-12 md:w-14 md:h-14 shrink-0')}
              name={item.iconName}
            />
          </a>
        );
      })}
    </div>
  );
};

export type { SocialsProps };
export { Socials };
