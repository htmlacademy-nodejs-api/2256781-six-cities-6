import { Location, Type } from '../../types/types';
import UserRdo from '../user/user.rdo';

export default class OfferRdo {
  public id!: string;

  public date!: string;

  public title!: string;

  public description!: string;

  public city!: string;

  public previewImage!: string;

  public images!: string[];

  public premium!: boolean;

  public favorite!: boolean;

  public rating!: number;

  public type!: Type;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public goods!: string[];

  public commentCount!: number;

  public author!: UserRdo;

  public location!: Location;
}
