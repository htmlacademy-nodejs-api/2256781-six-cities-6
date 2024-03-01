import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from '../index.js';
import { OfferEntity, UpdateOfferDto } from '../index.js';
import { IDocumentExists } from '../../types/index.js';
import { TSearchParameters } from './types/search-parameter.type.js';

export interface IOfferService extends IDocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(params: TSearchParameters): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
