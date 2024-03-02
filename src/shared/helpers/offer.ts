import {
  OfferGood,
  OfferType,
  City,
  IOffer,
  TUserType,
  IUser,
  TLocation,
} from '../types/index.js';
import { CHARACTER, RADIX_TEN } from './const.js';

export function convertLineOfferToObject(dataLine: string) {
  const [
    date,
    title,
    description,
    city,
    previewImage,
    images,
    premium,
    favorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    commentCount,
    coordinates,
    comments
  ] = dataLine.replace(CHARACTER.LINE_FEED, CHARACTER.EMPTY).split(CHARACTER.TAB);

  return {
    date,
    title,
    description,
    city,
    previewImage,
    images,
    premium,
    favorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    commentCount,
    coordinates,
    comments
  };
}

export function createOffer(dataLine: string): IOffer {
  const offer = convertLineOfferToObject(dataLine);

  const [name, userType, avatarUrl, email, password] = offer.host.split(CHARACTER.SEMICOLON);
  const [latitude, longitude] = offer.coordinates.split(CHARACTER.SEMICOLON);

  const user: IUser = {
    name,
    type: (userType as TUserType),
    email,
    avatarUrl,
    password
  };

  const location: TLocation = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };

  return {
    date: new Date(offer.date),
    title: offer.title,
    description: offer.description,
    city: offer.city as City,
    previewImage: offer.previewImage,
    images: offer.images.split(CHARACTER.SEMICOLON),
    premium: Boolean(offer.premium),
    favorite: Boolean(offer.favorite),
    rating: parseFloat(offer.rating),
    type: (offer.type as OfferType),
    bedrooms: parseInt(offer.bedrooms, RADIX_TEN),
    maxAdults: parseInt(offer.maxAdults, RADIX_TEN),
    price: parseInt(offer.price, RADIX_TEN),
    goods: (offer.goods.split(CHARACTER.SEMICOLON) as OfferGood[]),
    user,
    commentCount: parseInt(offer.commentCount, RADIX_TEN),
    location
  } as IOffer;
}
