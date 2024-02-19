import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { IOfferService } from '../index.js';
import { DefaultOfferService, OfferController } from '../index.js';
import { OfferEntity } from '../index.js';
import { OfferModel } from '../index.js';
import { IController } from '../../libs/index.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<IOfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<IController>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
