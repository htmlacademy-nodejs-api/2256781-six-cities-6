import { Type } from '../../types/types';
import UserRdo from '../user/user.rdo';

export default class OfferPreviewRdo {
  public id!: string;

  public date!: string;

  public title!: string;

  public city!: string;

  public previewImage!: string;

  public premium!: boolean;

  public favorite!: boolean;

  public rating!: number;

  public type!: Type;

  public price!: number;

  public bedrooms!: number;

  public description!: string;

  public goods!: string[];

  public images!: string[];

  public maxAdults!: number;

  public author!: UserRdo;
}
