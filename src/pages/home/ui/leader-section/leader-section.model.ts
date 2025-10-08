import { combine, createEvent, createStore, restore } from 'effector';

export type SocialType = 'vk' | 'facebook' | 'instagram' | 'telegram' | 'twitter' | 'linkedin';

export interface LeaderSocialDto {
  url: string;
  type: SocialType;
}

export interface LeaderMember {
  id: number;
  fullName: string;
  photo: string;
  city?: string;
  links: LeaderSocialDto[];
  country: string;
}

export type Continent = 'eu' | 'na' | 'sa' | 'af' | 'as';

const $map = createStore<Record<Continent, LeaderMember[]>>({
  eu: [
    {
      id: 1483,
      fullName: 'Simona Petrova',
      photo: '/static/images/content/leader-section/simona_petrova.jpg',
      links: [],
      country: 'bg',
    },
  ],
  na: [],
  sa: [],
  af: [
    {
      id: 104,
      fullName: 'SAMA NADEY R.',
      photo: '/static/images/content/leader-section/sama_nadey_r.jpg',
      links: [],
      country: 'bj',
    },
    {
      id: 4669,
      fullName: 'ISSAKA Habilou',
      photo: '/static/images/content/leader-section/issaka_habilou.jpg',
      links: [],
      country: 'bj',
    },
    {
      id: 110,
      fullName: 'KULEAMENU ANKOU JOSUÉ',
      photo: '/static/images/content/leader-section/kuleameny_ankou_josue.jpg',
      links: [],
      country: 'tg',
    },
    {
      id: 106,
      fullName: 'Mansoure Labodé',
      photo: '/static/images/content/leader-section/mansoure_labode.jpg',
      links: [],
      country: 'tg',
    },
    {
      id: 118,
      fullName: 'TCHIEKOUA TONKUI STÉPHANE',
      photo: '/static/images/content/leader-section/tchiekoua_tonkui_stephane.jpg',
      links: [],
      country: 'cm',
    },
    {
      id: 302,
      fullName: 'Kamagou Noucti Robert',
      photo: '/static/images/content/leader-section/koumagou_robert.jpg',
      links: [],
      country: 'cm',
    },
    {
      id: 249,
      fullName: 'Kodzo BOSSO',
      photo: '/static/images/content/leader-section/kodzo_bosso.jpg',
      links: [],
      country: 'sn',
    },
    {
      id: 13570,
      fullName: 'DIENEBOU BA',
      photo: '/static/images/content/leader-section/dienebou_ba.jpg',
      links: [],
      country: 'sn',
    },
    {
      id: 11440,
      fullName: `KARIM N'DOH OUATTARA`,
      photo: '/static/images/content/leader-section/karim_ndoh_ouattara.jpg',
      links: [],
      country: 'ml',
    },
    {
      id: 131,
      fullName: 'Ousmane ZONGO',
      photo: '/static/images/content/leader-section/ousmane_zongo.jpg',
      links: [],
      country: 'bf',
    },
    {
      id: 157,
      fullName: 'Ibrahim Ouédrago',
      photo: '/static/images/content/leader-section/ibrahim_ouedrago.jpg',
      links: [],
      country: 'bf',
    },
    {
      id: 502,
      fullName: 'Misuanga Arnaud Adolphe',
      photo: '/static/images/content/leader-section/misuanga_arnaud_adolphe.jpg',
      links: [],
      country: 'cd',
    },
  ],
  as: [],
});
const $availableContinents = $map.map(
  (map) => Object.keys(map),
  // Object.keys(map).filter((key) => map[key]?.length > 0),
);
const activeContinentChanged = createEvent<string | null>();
const $activeContinent = restore(activeContinentChanged, 'af');

const $listByContinent = combine($map, $activeContinent, (map, activeContinent) => {
  if (!activeContinent) {
    return [];
  }
  return map[activeContinent] ?? [];
});

export const $$leaderSection = {
  activeContinentChanged,
  $activeContinent,
  $listByContinent,
  $availableContinents,
};
