export interface CoverageMapItem {
  title: string;
  country: string;
  city: string;
  address: string;
  socials: { name: string; url: string }[];
  contacts: {
    fullName: string;
    data: { type: 'phone' | 'viber' | 'whatsapp' | 'telegram'; value: string }[];
  }[];
  coordinates: [number, number];
}

export const mapItems: CoverageMapItem[] = [
  {
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
    ],
    coordinates: [48.8566, 2.3522],
  },
  {
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
    coordinates: [55.7539, 37.6208],
  },
  {
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
    coordinates: [59.9343, 30.3351],
  },
  {
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
    coordinates: [52.52, 13.405],
  },
  {
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
    coordinates: [40.4168, -3.7038],
  },
  {
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
    coordinates: [51.5154, -0.141],
  },
];
