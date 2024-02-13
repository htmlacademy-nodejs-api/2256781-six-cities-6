import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { DEFAULT_OFFER_VALUE, IOfferService, OfferEntity, UpdateOfferDto, getOfferAggregation } from '../index.js';
import { ILogger } from '../../libs/index.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async create(dto: UpdateOfferDto): Promise<DocumentType<OfferEntity>> {
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
    sort: Record<string, SortType> = { date: SortType.Down }
  ): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        { $sort: sort },
        { $limit: limit },
        ...getOfferAggregation(userId),
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

  public async findFavorites(userId: string, isFavorite: boolean = true): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ userId, favorite: isFavorite })
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
