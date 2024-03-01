import { ClassConstructor as TClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ApplicationError, TValidationErrorFields } from '../libs/index.js';

export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  Number(((Math.random() * (max - min)) + min).toFixed(numAfterDigit));


export function getRandomItems<T>(items: T[], length?: number): T[] {
  const startPosition = length ? 0 : generateRandomValue(0, items.length - 1);
  const endPosition = length ?? (startPosition + generateRandomValue(startPosition, items.length));

  return items.slice(startPosition, endPosition);
}

export const getRandomItem = <T>(items: T[]): T => items[generateRandomValue(0, items.length - 1)];

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const fillDTO = <T, V>(someDto: TClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (errorType: ApplicationError, error: string, details: TValidationErrorFields = []) => ({
  errorType,
  error,
  details
});

export const reduceValidationErrors = (errors: ValidationError[]): TValidationErrorFields =>
  errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

export const getFullServerPath = (host: string, port: number) =>
  `http://${host}:${port}`;
