import { IUser, OfferGood, OfferType, TCity, TLocation } from './index.js';

export type TOffer = {
  id?: string;
  date: Date;
  title: string;
  description: string;
  city: TCity;
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

export type TOffers = TOffer[];
