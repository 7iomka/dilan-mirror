import type { SocialItem } from '@/widgets/socials';
import type { IconName } from '@/shared/ui/icon';

export const mapSocialsToItems = (socials: { name: string; url: string }[]): SocialItem[] => {
  return socials.map((social) => ({
    name: social.name,
    url: social.url,
    iconName: social.name.toLowerCase() as IconName,
  }));
};

export const contactLinkMapping: Record<string, (value: string) => string> = {
  phone: (value) => `tel:${value}`,
  whatsapp: (value) => `https://wa.me/${value.replace(/\D/g, '')}`,
  viber: (value) => `viber://chat?number=${value.replace(/\D/g, '')}`,
  telegram: (value) => `https://t.me/${value.startsWith('@') ? value.slice(1) : value}`,
};
