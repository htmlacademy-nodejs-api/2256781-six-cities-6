import { Expose } from 'class-transformer';
import { OfferType } from '../../../types/index.js';

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
  public commentCount!: number;
}
