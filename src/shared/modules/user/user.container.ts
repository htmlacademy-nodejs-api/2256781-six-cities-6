import { Container } from 'inversify';
import { IUserService } from '../index.js';
import { Component } from '../../types/index.js';
import { DefaultUserService } from '../index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<IUserService>(Component.UserService).to(DefaultUserService).inSingletonScope();

  return userContainer;
}
