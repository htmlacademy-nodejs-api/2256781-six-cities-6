import { OfferGood, OfferType, City } from '../../../types/index.js';

export class UpdateOfferDto {
  public date!: Date;

  public title!: string;

  public description!: string;

  public city!: City;

  public previewImage!: string;

  public images!: string[];

  public premium!: boolean;

  public favorite!: boolean;

  public rating!: number;

  public type!: OfferType;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public goods!: OfferGood[];

  public commentCount!: number;

  public location!: string;
}
