import { City, TLocation } from './index.js';

export const Location: Record<City, TLocation> = {
  Paris: { latitude: 48.85661, longitude: 2.351499, zoom: 16 },
  Cologne: { latitude: 50.938361, longitude: 6.959974, zoom: 16 },
  Brussels: { latitude: 50.846557, longitude: 4.351697, zoom: 16 },
  Amsterdam: { latitude: 52.370216, longitude: 4.895168, zoom: 16 },
  Hamburg: { latitude: 53.550341, longitude: 10.000654, zoom: 16 },
  Dusseldorf: { latitude: 51.225402, longitude: 6.776314, zoom: 16 },
} as const;
