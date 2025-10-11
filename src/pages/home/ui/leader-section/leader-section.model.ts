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
  region?: string;
}

export type Continent = 'eu' | 'na' | 'sa' | 'af' | 'as';

const $map = createStore<Record<Continent, LeaderMember[]>>({
  // Asia
  as: [
    {
      id: 1144,
      fullName: 'Trần Thị Mộng Huyền',
      photo: '/static/images/content/leader-section/tran_thi_mong_huyen.jpg',
      links: [],
      country: 'vn',
      region: 'Đại Diện Quốc Gia',
    },
    {
      id: 1277,
      fullName: 'Trần Thị Thu Thủy',
      photo: '/static/images/content/leader-section/tran_thi_thu_thuy.jpg',
      links: [],
      country: 'vn',
      region: 'Thành phố Ninh Bình',
    },
    {
      id: 1283,
      fullName: 'Quang Huy Hoàng',
      photo: '/static/images/content/leader-section/quang_huy_hoang.jpg',
      links: [],
      country: 'vn',
      region: 'Thành Phố Hà Tĩnh',
    },
    {
      id: 17647,
      fullName: 'Nguyễn Hữu Bắc',
      photo: '/static/images/content/leader-section/nguyen_huu_bac.jpg',
      links: [],
      country: 'vn',
      region: 'Thành Phố Nghệ An',
    },
    {
      id: 8273,
      fullName: 'Trần Thị Hồng Lam',
      photo: '/static/images/content/leader-section/tran_thi_hong_lam.jpg',
      links: [],
      country: 'vn',
      region: 'Tỉnh Đồng Nai',
    },
    {
      id: 11235,
      fullName: 'Trần Thị Tuyết Minh',
      photo: '/static/images/content/leader-section/tran_thi_tuyet_minh.jpg',
      links: [],
      country: 'vn',
      region: 'Thành Phố Ninh Bình',
    },
    {
      id: 8073,
      fullName: 'Trương Thị Phương',
      photo: '/static/images/content/leader-section/truong_thi_phuong.jpg',
      links: [],
      country: 'vn',
      region: 'Thành Phố Đồng Nai',
    },
    {
      id: 10445,
      fullName: 'Dương Thị Hương',
      photo: '/static/images/content/leader-section/duong_thi_huong.jpg',
      links: [],
      country: 'vn',
      region: 'Thành Phố Nam Định',
    },
    {
      id: 16807,
      fullName: 'Dương Thị Oanh',
      photo: '/static/images/content/leader-section/duong_thi_oanh.jpg',
      links: [],
      country: 'vn',
      region: 'Thành Phố Yên Bái',
    },
    {
      id: 1844,
      fullName: 'Đặng Hồng Phương',
      photo: '/static/images/content/leader-section/dang_hong_phuong.jpg',
      links: [],
      country: 'vn',
      region: 'Tỉnh Phú Thọ',
    },
    {
      id: 3828,
      fullName: 'Bùi Mi Lơ',
      photo: '/static/images/content/leader-section/bui_mi_lo.jpg',
      links: [],
      country: 'vn',
      region: 'Thành Phố Quảng Ngãi',
    },
    {
      id: 20849,
      fullName: 'Nguyễn Phước Thùy Trang',
      photo: '/static/images/content/leader-section/nguyen_phuoc_thuy_trang.jpg',
      links: [],
      country: 'vn',
      region: 'Thành Phố Thanh Hóa',
    },
    {
      id: 14867,
      fullName: 'Huỳnh Thị Oanh Châu',
      photo: '/static/images/content/leader-section/huynh_thi_oanh_chau.jpg',
      links: [],
      country: 'vn',
      region: 'Tỉnh Đăk Lăk',
    },
  ],
  // Africa
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
  // Europe
  eu: [
    {
      id: 1483,
      fullName: 'Simona Petrova',
      photo: '/static/images/content/leader-section/simona_petrova.jpg',
      links: [],
      country: 'bg',
    },
  ],
  // North America
  na: [],
  // South America
  sa: [],
});
const $availableContinents = $map.map((map) =>
  Object.keys(map).filter((key) => map[key]?.length > 0),
);
const activeContinentChanged = createEvent<string | null>();
const $activeContinent = restore(activeContinentChanged, 'as');

const $listByContinent = combine($map, $activeContinent, (map, activeContinent) => {
  if (!activeContinent || !(activeContinent in map)) {
    return [] as LeaderMember[];
  }
  return (map[activeContinent] ?? []) as LeaderMember[];
});

export const $$leaderSection = {
  activeContinentChanged,
  $activeContinent,
  $listByContinent,
  $availableContinents,
};
