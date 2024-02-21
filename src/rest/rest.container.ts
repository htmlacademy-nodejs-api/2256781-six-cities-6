import { Container } from 'inversify';
import { RestApplication } from './index.js';
import { Component } from '../shared/types/index.js';
import {
  IConfig,
  IDatabaseClient,
  IExceptionFilter,
  ILogger,
  AppExceptionFilter,
  EnvConfig,
  MongoDatabaseClient,
  PinoLogger,
} from '../shared/libs/index.js';
import { TConfigSchema } from '../shared/types/index.js';
import { createAuthContainer, createOfferContainer, createUserContainer } from '../shared/modules/index.js';
import { createCommentContainer } from '../shared/modules/comment/comment-container.js';

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
  createOfferContainer(),
  createUserContainer(),
  createCommentContainer(),
  createAuthContainer(),
);
