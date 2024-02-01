import { inject, injectable } from 'inversify';
import { TRestSchema } from '../shared/libs/config/rest.schema.js';
import { IConfig, ILogger } from '../shared/libs/index.js';
import { Component } from '../shared/types/component.enum.js';
import { IDatabaseClient } from '../shared/libs/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { UserModel } from '../shared/modules/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
  ) { }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

    const user = new UserModel({
      email: 'test@emailru',
      avatarPath: 'keks.jpg',
      firstname: '2',
      lastname: 'Unknown'
    });

    const error = user.validateSync();
    console.log(error);
  }
}
