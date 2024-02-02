import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { IConfig } from '../index.js';
import { ILogger } from '../index.js';
import { configRestSchema } from './rest.schema.js';
import { Component } from '../../types/component.enum.js';
import { TRestSchema } from '../../types/index.js';

@injectable()
export class RestConfig implements IConfig<TRestSchema> {
  private readonly config: TRestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof TRestSchema>(key: T): TRestSchema[T] {
    return this.config[key];
  }
}
