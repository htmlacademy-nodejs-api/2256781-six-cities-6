import { OfferGood, OfferType, City, IOffer, TUserType, IUser, TLocation } from '../types/index.js';

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
  ] = dataLine.replace('\n', '').split('\t');

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

  const [name, userType, avatarUrl, email, password] = offer.host.split(';');
  const [latitude, longitude] = offer.coordinates.split(';');

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
    images: offer.images.split(';'),
    premium: Boolean(offer.premium),
    favorite: Boolean(offer.favorite),
    rating: parseFloat(offer.rating),
    type: (offer.type as OfferType),
    bedrooms: parseInt(offer.bedrooms, 10),
    maxAdults: parseInt(offer.maxAdults, 10),
    price: parseInt(offer.price, 10),
    goods: (offer.goods.split(';') as OfferGood[]),
    user,
    commentCount: parseInt(offer.commentCount, 10),
    location
  } as IOffer;
}
