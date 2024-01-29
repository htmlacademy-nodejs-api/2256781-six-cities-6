import { TRestSchema } from '../shared/libs/config/rest.schema.js';
import { IConfig, ILogger } from '../shared/libs/index.js';

export class RestApplication {
  constructor(
    private readonly logger: ILogger,
    private readonly config: IConfig<TRestSchema>,
  ) { }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
