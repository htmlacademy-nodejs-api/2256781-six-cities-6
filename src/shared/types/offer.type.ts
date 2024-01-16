import { OfferGood, OfferType, TCity, TLocation, TUser } from './index.js';

export type TOffer = {
  id?: string;
  date: Date;
  title: string;
  description: string;
  city: TCity;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: OfferGood[];
  host: TUser;
  comments: number;
  location: TLocation;
}

export type TOffers = TOffer[];
