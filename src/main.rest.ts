import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfig, ILogger, PinoLogger } from './shared/libs/index.js';
import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/index.js';
import { TRestSchema } from './shared/libs/index.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication);
  container.bind<ILogger>(Component.Logger).to(PinoLogger);
  container.bind<IConfig<TRestSchema>>(Component.Config).to(RestConfig);

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
