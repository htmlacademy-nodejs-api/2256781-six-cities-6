import { inject, injectable } from 'inversify';
import { TRestSchema } from '../shared/libs/config/rest.schema.js';
import { IConfig, ILogger } from '../shared/libs/index.js';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
  ) { }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
