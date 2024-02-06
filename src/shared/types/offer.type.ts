import { OfferGood, OfferType, City, TLocation, IUser } from './index.js';

export interface IOffer {
  date: Date;
  title: string;
  description: string;
  city: City;
  previewImage: string;
  images: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: OfferGood[];
  user: IUser;
  comments: number;
  location: TLocation;
}

export type TOffers = IOffer[];
