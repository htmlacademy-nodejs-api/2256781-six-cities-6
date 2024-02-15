import { inject, injectable } from 'inversify';
import { TConfigSchema } from '../shared/types/index.js';
import { IConfig, ILogger } from '../shared/libs/index.js';
import { Component } from '../shared/types/component.enum.js';
import { IDatabaseClient } from '../shared/libs/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { IOfferService } from '../shared/modules/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TConfigSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
    @inject(Component.OfferService) private readonly offerService: IOfferService,

  ) { }

  private async initDb() {
    const mongoUri = getMongoURI({
      login: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      base: this.config.get('DB_NAME'),
    });

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');

    const res = await this.offerService.find();
    console.log(res);
  }
}
