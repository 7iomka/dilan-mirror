import type { SocialItem } from '@/widgets/socials';
import type { IconName } from '@/shared/ui/icon';

export const mapSocialsToItems = (socials: { name: string; url: string }[]): SocialItem[] => {
  return socials.map((social) => ({
    name: social.name,
    url: social.url,
    iconName: social.name.toLowerCase() as IconName,
  }));
};
