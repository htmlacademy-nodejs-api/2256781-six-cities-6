import { OfferGood, OfferType, TCity, TOffer, TUserType } from '../types/index.js';
import { IUser } from '../types/index.js';

export function createOffer(dataLine: string): TOffer {
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
    location,
  ] = dataLine.replace('\n', '').split('\t');

  const [hostName, hostType, hostAvatar, hostEMail, hostPassword] = host.split(';');
  const [latitude, longitude, zoom] = location.split(';');

  const user: IUser = {
    name: hostName,
    type: (hostType as TUserType),
    email: hostEMail,
    avatarUrl: hostAvatar,
    password: hostPassword
  };

  return {
    date: new Date(date),
    title,
    description,
    city: city as TCity,
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
    location: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      zoom: parseFloat(zoom),
    },
  } as TOffer;
}
