export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return Number(((Math.random() * (max - min)) + min).toFixed(numAfterDigit));
}

export function getRandomItems<T>(items: T[], length?: number): T[] {
  const startPosition = length ? 0 : generateRandomValue(0, items.length - 1);
  const endPosition = length ?? (startPosition + generateRandomValue(startPosition, items.length));

  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
