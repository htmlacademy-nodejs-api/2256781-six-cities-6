import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { IUserService } from '../index.js';
import { Component } from '../../types/index.js';
import { DefaultUserService } from '../index.js';
import { UserEntity, UserModel } from '../index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<IUserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.OfferModel).toConstantValue(UserModel);

  return userContainer;
}
