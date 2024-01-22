import { TCity, TLocation } from '../types/index.js';

export const CITIES: Record<Uppercase<TCity>, TLocation> = {
  PARIS: { latitude: 48.85661, longitude: 2.351499 },
  COLOGNE: { latitude: 50.938361, longitude: 6.959974 },
  BRUSSELS: { latitude: 50.846557, longitude: 4.351697 },
  AMSTERDAM: { latitude: 52.370216, longitude: 4.895168 },
  HAMBURG: { latitude: 53.550341, longitude: 10.000654 },
  DUSSELDORF: { latitude: 51.225402, longitude: 6.776314 },
};
