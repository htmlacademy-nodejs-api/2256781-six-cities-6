import { ILogger } from '../shared/libs/index.js';

export class RestApplication {
  constructor(
    private readonly logger: ILogger
  ) { }

  public async init() {
    this.logger.info('Application initialization');
  }
}
