import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { TConfigSchema } from '../shared/types/index.js';
import { IConfig, ILogger } from '../shared/libs/index.js';
import { Component } from '../shared/types/index.js';
import { IDatabaseClient } from '../shared/libs/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { IController, IExceptionFilter } from '../shared/libs/index.js';
import { ParseTokenMiddleware } from '../shared/libs/index.js';

@injectable()
export class RestApplication {
  protected readonly server: Express = express();

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TConfigSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: IExceptionFilter,
    @inject(Component.UserController) private readonly userController: IController,
    @inject(Component.OfferController) private readonly offerController: IController,
    @inject(Component.CommentController) private readonly commentController: IController,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: IExceptionFilter,
  ) { }

  private async initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
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

  private async initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(
      '/uploads',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  private async initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server…');
    await this.initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
