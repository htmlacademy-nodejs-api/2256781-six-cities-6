import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { getRestApplicationContainer } from './rest/index.js';

async function bootstrap() {
  const appContainer = getRestApplicationContainer();

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
