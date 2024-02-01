import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfig, ILogger, PinoLogger } from './shared/libs/index.js';
import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/index.js';
import { TRestSchema } from './shared/libs/index.js';
import { Component } from './shared/types/index.js';
import { IDatabaseClient, MongoDatabaseClient } from './shared/libs/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
