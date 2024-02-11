import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import { ILogger, PinoLogger } from '../shared/libs/index.js';
import { IConfig, RestConfig } from '../shared/libs/index.js';
import { TRestSchema } from '../shared/types/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../shared/libs/index.js';
import { createOfferContainer, createUserContainer } from '../shared/modules/index.js';
import { createCommentContainer } from '../shared/modules/comment/comment-container.js';

function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<IConfig<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
}

export const getRestApplicationContainer = () => Container.merge(
  createRestApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer(),
);
