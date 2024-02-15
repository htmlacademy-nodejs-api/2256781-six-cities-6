import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { TConfigSchema } from '../shared/types/index.js';
import { IConfig, ILogger } from '../shared/libs/index.js';
import { Component } from '../shared/types/component.enum.js';
import { IDatabaseClient } from '../shared/libs/index.js';
import { getMongoURI } from '../shared/helpers/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TConfigSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
  ) {
    this.server = express();
  }

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

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Try to init server…');
    await this.initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
