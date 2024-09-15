export interface CoverageMapItem {
  latitude: number;
  longitude: number;
  title: string;
  country: string;
  city: string;
  address: string;
  socials: { name: string; url: string }[];
  contacts: {
    fullName: string;
    data: { type: 'phone' | 'viber' | 'whatsapp' | 'telegram'; value: string }[];
  }[];
}

export const mapItems: CoverageMapItem[] = [
  {
    latitude: 48.8566,
    longitude: 2.3522,
    title: 'Paris Store 1',
    country: 'France',
    city: 'Paris',
    address: '12 Rue de Rivoli, 75001 Paris, France',
    socials: [
      { name: 'Instagram', url: 'https://instagram.com/parisstore1' },
      { name: 'Facebook', url: 'https://facebook.com/parisstore1' },
    ],
    contacts: [
      {
        fullName: 'Jean Dupont',
        data: [
          { type: 'phone', value: '+33 1 42 72 31 10' },
          { type: 'whatsapp', value: '+33 6 12 34 56 78' },
        ],
      },
      {
        fullName: 'Jean2 Dupont2',
        data: [
          { type: 'phone', value: '+33 1 42 72 31 10' },
          { type: 'whatsapp', value: '+33 6 12 34 56 78' },
        ],
      },
    ],
  },
  {
    latitude: 55.7558,
    longitude: 37.6173,
    title: 'Moscow Store 1',
    country: 'Russia',
    city: 'Moscow',
    address: 'Red Square, 109012 Moscow, Russia',
    socials: [
      { name: 'Instagram', url: 'https://instagram.com/moscowstore1' },
      { name: 'VK', url: 'https://vk.com/moscowstore1' },
    ],
    contacts: [
      {
        fullName: 'Ivan Ivanov',
        data: [
          { type: 'phone', value: '+7 495 123 45 67' },
          { type: 'telegram', value: '@ivanov_moscow' },
        ],
      },
    ],
  },
  {
    latitude: 59.9343,
    longitude: 30.3351,
    title: 'Saint Petersburg Store',
    country: 'Russia',
    city: 'Saint Petersburg',
    address: 'Nevsky Prospect, 191025 Saint Petersburg, Russia',
    socials: [
      { name: 'Instagram', url: 'https://instagram.com/spbstore' },
      { name: 'VK', url: 'https://vk.com/spbstore' },
    ],
    contacts: [
      {
        fullName: 'Anna Petrova',
        data: [
          { type: 'phone', value: '+7 812 987 65 43' },
          { type: 'viber', value: '+7 812 654 32 10' },
        ],
      },
    ],
  },
  {
    latitude: 52.52,
    longitude: 13.405,
    title: 'Berlin Store',
    country: 'Germany',
    city: 'Berlin',
    address: 'Alexanderplatz, 10178 Berlin, Germany',
    socials: [
      { name: 'Instagram', url: 'https://instagram.com/berlinstore' },
      { name: 'Facebook', url: 'https://facebook.com/berlinstore' },
    ],
    contacts: [
      {
        fullName: 'Hans Müller',
        data: [
          { type: 'phone', value: '+49 30 123 4567' },
          { type: 'whatsapp', value: '+49 170 123 45 67' },
        ],
      },
    ],
  },
  {
    latitude: 40.4168,
    longitude: -3.7038,
    title: 'Madrid Store',
    country: 'Spain',
    city: 'Madrid',
    address: 'Gran Via, 28013 Madrid, Spain',
    socials: [
      { name: 'Instagram', url: 'https://instagram.com/madridstore' },
      { name: 'Facebook', url: 'https://facebook.com/madridstore' },
    ],
    contacts: [
      {
        fullName: 'Carlos García',
        data: [
          { type: 'phone', value: '+34 91 234 5678' },
          { type: 'telegram', value: '@carlos_madrid' },
        ],
      },
    ],
  },
  {
    latitude: 51.5074,
    longitude: -0.1278,
    title: 'London Store',
    country: 'United Kingdom',
    city: 'London',
    address: 'Oxford Street, W1D 1BS London, United Kingdom',
    socials: [
      { name: 'Instagram', url: 'https://instagram.com/londonstore' },
      { name: 'Facebook', url: 'https://facebook.com/londonstore' },
    ],
    contacts: [
      {
        fullName: 'John Smith',
        data: [
          { type: 'phone', value: '+44 20 1234 5678' },
          { type: 'whatsapp', value: '+44 7700 900123' },
        ],
      },
    ],
  },
];
