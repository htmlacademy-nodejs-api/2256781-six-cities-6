import { Expose } from 'class-transformer';
import { OfferType } from '../../../types/offer-type.enum.js';

export class LoggedUserRdo {
  @Expose()
  public email!: string;

  @Expose()
  public name!: string;

  @Expose()
  public avatarUrl!: string;

  @Expose()
  public type!: OfferType;

  @Expose()
  public token!: string;
}
