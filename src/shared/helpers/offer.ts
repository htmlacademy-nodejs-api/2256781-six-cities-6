import { OfferGood, OfferType, City, IOffer, TUserType, IUser, TLocation } from '../types/index.js';

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
    host,
    comments,
    coordinates,
  ] = dataLine.replace('\n', '').split('\t');

  const [name, userType, avatarUrl, email, password] = host.split(';');
  const [latitude, longitude, zoom] = coordinates.split(';');

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
    zoom: parseFloat(zoom),
  };

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
    user,
    comments: parseInt(comments, 10),
    location
  } as IOffer;
}
