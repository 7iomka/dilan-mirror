export interface CoverageMapItem {
  title: string;
  coordinates: [number, number];
}

export const mapItems = [
  {
    title: 'Brussels',
    coordinates: [50.8371, 4.3676],
  },
  {
    title: 'Copenhagen',
    coordinates: [55.6763, 12.5681],
  },
  {
    title: 'Paris',
    coordinates: [48.8567, 2.351],
  },
  {
    title: 'Reykjavik',
    coordinates: [64.1353, -21.8952],
  },
  {
    title: 'Moscow',
    coordinates: [55.7558, 37.6176],
  },
  {
    title: 'Madrid',
    coordinates: [40.4167, -3.7033],
  },
  {
    title: 'London',
    coordinates: [51.5002, -0.1262],
  },
  {
    title: 'Peking',
    coordinates: [39.9056, 116.3958],
  },
  {
    title: 'New Delhi',
    coordinates: [28.6353, 77.225],
  },
  {
    title: 'Tokyo',
    coordinates: [35.6785, 139.6823],
  },
  {
    title: 'Ankara',
    coordinates: [39.9439, 32.856],
  },
  {
    title: 'Buenos Aires',
    coordinates: [-34.6118, -58.4173],
  },
  {
    title: 'Brasilia',
    coordinates: [-15.7801, -47.9292],
  },
  {
    title: 'Ottawa',
    coordinates: [45.4235, -75.6979],
  },
  {
    title: 'Washington',
    coordinates: [38.8921, -77.0241],
  },
  {
    title: 'Kinshasa',
    coordinates: [-4.3369, 15.3271],
  },
  {
    title: 'Cairo',
    coordinates: [30.0571, 31.2272],
  },
  {
    title: 'Pretoria',
    coordinates: [-25.7463, 28.1876],
  },
] satisfies CoverageMapItem[];
