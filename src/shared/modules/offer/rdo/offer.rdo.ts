import { Expose } from 'class-transformer';
import {
  OfferGood,
  OfferType,
  TLocation
} from '../../../types/index.js';
import { UserRdo } from '../../index.js';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public date!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: OfferGood[];

  @Expose()
  public commentCount!: number;

  @Expose()
  public author!: UserRdo;

  @Expose()
  public location!: TLocation;
}
