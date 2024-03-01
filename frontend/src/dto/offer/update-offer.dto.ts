import { CityName, Type, Location } from '../../types/types';

export default class UpdateOfferDto {
  public title?: string;

  public date?: Date;

  public description?: string;

  public city?: CityName;

  public previewImage?: string;

  public images?: string[];

  public premium?: boolean;

  public favorite?: boolean;

  public rating?: number;

  public type?: Type;

  public bedrooms?: number;

  public maxAdults?: number;

  public price?: number;

  public goods?: string[];

  public commentCount?: number;

  public location?: Location;
}
