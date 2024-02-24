import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import {
  DEFAULT_OFFER_VALUE,
  IOfferService,
  OfferEntity,
  CreateOfferDto,
  getOfferAggregation,
  UpdateOfferDto,
} from '../index.js';
import { ILogger } from '../../libs/index.js';
import { SortType } from '../../types/index.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async find(
    userId?: string,
    limit: number = DEFAULT_OFFER_VALUE.OFFER_COUNT,
    sort: Record<string, SortType> = { date: SortType.Down },
    isFavoriteOnly: boolean = false,
  ): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        ...getOfferAggregation(userId),
        isFavoriteOnly ? { $match: { favorite: true } } : { $match: {} },
        { $sort: sort },
        { $limit: limit },
      ])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async findPremiumByCity(city: string, isPremium: boolean = true): Promise<DocumentType<OfferEntity>[]> {
    const limit = DEFAULT_OFFER_VALUE.PREMIUM_COUNT;
    return this.offerModel
      .find({ city, premium: isPremium }, {}, { limit })
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: 1,
        }
      }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: documentId })) !== null;
  }
}
