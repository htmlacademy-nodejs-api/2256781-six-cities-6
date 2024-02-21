import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { AuthExceptionFilter, IAuthService } from '../index.js';
import { DefaultAuthService } from '../index.js';
import { IExceptionFilter } from '../../libs/index.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<IAuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<IExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
