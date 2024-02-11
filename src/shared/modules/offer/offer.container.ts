import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { IOfferService } from './offer-service.interface.js';
import { DefaultOfferService } from '../index.js';
import { OfferEntity } from '../index.js';
import { OfferModel } from '../index.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<IOfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
