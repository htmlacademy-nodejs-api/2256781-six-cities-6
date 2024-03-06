import { Expose } from 'class-transformer';
import { OfferType } from '../../../types/index.js';
import { UserRdo } from '../../index.js';

export class OfferPreviewRdo {
  @Expose()
  public id!: string;

  @Expose()
  public date!: string;

  @Expose()
  public title!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public price!: number;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public description!: string;

  @Expose()
  public goods!: string[];

  @Expose()
  public images!: string[];

  @Expose()
  public maxAdults!: number;

  @Expose()
  public author!: UserRdo;
}
