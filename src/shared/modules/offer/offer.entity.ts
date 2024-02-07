import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { OfferGood, OfferType, City } from '../../types/index.js';
import { UserEntity } from '../index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public date!: Date;

  @prop({
    trim: true,
    required: true,
    minlength: 10,
    maxlength: 100,
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: 20,
    maxlength: 1024,
  })
  public description!: string;

  @prop({
    required: true,
    type: () => String,
    enum: City,
  })
  public city!: City;

  @prop({
    required: true,
    default: '',
  })
  public previewImage!: string;

  @prop({
    required: true,
    type: () => [String],
    default: [],
  })
  public images!: string[];

  @prop({
    required: true,
    default: false,
  })
  public premium!: boolean;

  @prop({
    required: true,
    default: false,
  })
  public favorite!: boolean;

  @prop({
    required: true,
  })
  public rating!: number;

  @prop({
    required: true,
    enum: OfferType,
  })
  public type!: OfferType;

  @prop({
    required: true,
    min: 1,
    max: 8,
  })
  public bedrooms!: number;

  @prop({
    required: true,
    min: 1,
    max: 10
  })
  public maxAdults!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000
  })
  public price!: number;

  @prop({
    required: true,
    type: () => [String],
    default: [],
    enum: OfferGood
  })
  public goods!: OfferGood[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public comments!: number;

  @prop({
    required: true,
    type: () => String,
  })
  public location!: string;
}

export const OfferModel = getModelForClass(OfferEntity);
