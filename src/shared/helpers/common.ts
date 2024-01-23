export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[], length?: number): T[] {
  let startPosition: number;
  let endPosition: number;

  if (length) {
    startPosition = 0;
    endPosition = length;
  } else {
    startPosition = generateRandomValue(0, items.length - 1);
    endPosition = startPosition + generateRandomValue(startPosition, items.length);
  }
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}
