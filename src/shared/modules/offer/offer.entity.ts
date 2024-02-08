import { Ref, defaultClasses, modelOptions, prop } from '@typegoose/typegoose';
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
    type: () => String,
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    type: () => String,
  })
  public description!: string;

  @prop({
    required: true,
    type: () => String,
  })
  public city!: City;

  @prop({
    required: true,
    type: () => String,
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
    type: () => Boolean,
    default: false,
  })
  public premium!: boolean;

  @prop({
    required: true,
    default: false,
    type: () => Boolean,
  })
  public favorite!: boolean;

  @prop({
    required: true,
    type: () => Number,
    default: 1,
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
  })
  public type!: OfferType;

  @prop({
    required: true,
    type: () => Number,
    default: 1,
  })
  public bedrooms!: number;

  @prop({
    required: true,
    type: () => Number,
    default: 1,
  })
  public maxAdults!: number;

  @prop({
    required: true,
    type: () => Number,
    default: 100,
  })
  public price!: number;

  @prop({
    required: true,
    type: () => [String],
    default: [],
  })
  public goods!: OfferGood[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    type: () => Number,
    default: 0,
  })
  public commentCount!: number;

  @prop({
    required: true,
    type: () => String,
  })
  public location!: string;
}
