import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import { ILogger, PinoLogger } from '../shared/libs/index.js';
import { IConfig, EnvConfig } from '../shared/libs/index.js';
import { TConfigSchema } from '../shared/types/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../shared/libs/index.js';
import { createOfferContainer, createUserContainer } from '../shared/modules/index.js';
import { createCommentContainer } from '../shared/modules/comment/comment-container.js';
import { AppExceptionFilter, IExceptionFilter } from './index.js';

function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<IConfig<TConfigSchema>>(Component.Config).to(EnvConfig).inSingletonScope();
  restApplicationContainer.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<IExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();

  return restApplicationContainer;
}

export const getRestApplicationContainer = () => Container.merge(
  createRestApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer(),
);
