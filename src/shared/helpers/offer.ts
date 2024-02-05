import { Ref } from '@typegoose/typegoose';
import { OfferGood, OfferType, City, IOffer } from '../types/index.js';
import { UserEntity } from '../modules/index.js';

export function createOffer(dataLine: string): IOffer {
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
    userId,
    comments,
    location,
  ] = dataLine.replace('\n', '').split('\t');

  const [latitude, longitude, zoom] = location.split(';');

  return {
    date: new Date(date),
    title,
    description,
    city: city as City,
    previewImage,
    images: images.split(';'),
    premium: Boolean(premium),
    favorite: Boolean(favorite),
    rating: parseFloat(rating),
    type: (type as OfferType),
    bedrooms: parseInt(bedrooms, 10),
    maxAdults: parseInt(maxAdults, 10),
    price: parseInt(price, 10),
    goods: (goods.split(';') as OfferGood[]),
    userId: (userId as unknown as Ref<UserEntity>),
    comments: parseInt(comments, 10),
    location: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      zoom: parseFloat(zoom),
    },
  } as IOffer;
}
