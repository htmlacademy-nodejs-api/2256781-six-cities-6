import path from 'node:path';
import { Logger as TPinoInstance, pino, transport } from 'pino';
import { injectable } from 'inversify';
import { ILogger } from './logger.interface.js';

@injectable()
export class PinoLogger implements ILogger {
  private readonly logger: TPinoInstance;

  constructor() {
    const logFilePath = 'logs/rest.log';
    const destination = path.join(path.resolve(), logFilePath);

    this.logger = pino({}, transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        }
      ],
    }));
    this.logger.info('Logger created…');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
