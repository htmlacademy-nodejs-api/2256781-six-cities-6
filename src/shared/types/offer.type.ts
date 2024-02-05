import { Ref } from '@typegoose/typegoose';
import { OfferGood, OfferType, City, TLocation } from './index.js';
import { UserEntity } from '../modules/index.js';

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
  userId: Ref<UserEntity>;
  comments: number;
  location: TLocation;
}

export type TOffers = IOffer[];
