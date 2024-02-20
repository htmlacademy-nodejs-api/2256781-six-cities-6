import {
  OfferGood,
  OfferType,
  City,
  TLocation,
  IUser,
} from './index.js';

export interface IOffer {
  id?: string,
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
  commentCount: number;
  location: TLocation;
}

export type TOffers = IOffer[];

export type TOfferPreview = {
  id: string;
  date: Date;
  city: City;
  previewImage: string;
  title: string;
  favorite: boolean;
  premium: boolean;
  rating: number;
  type: OfferType;
  price: number;
  commentCount: number;
}

export type TOffersPreview = TOfferPreview[];
