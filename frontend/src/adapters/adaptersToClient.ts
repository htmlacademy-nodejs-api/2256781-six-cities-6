import { CityLocation, UserType } from '../const';
import CommentRdo from '../dto/comment/comment.rdo';
import OfferPreviewRdo from '../dto/offer/offer-preview.rdo';
import OfferRdo from '../dto/offer/offer.rdo';
import { UserTypeDto } from '../dto/user/create-user.dto';
import UserRdo from '../dto/user/user.rdo';
import { City, CityName, Comment, Offer, User } from '../types/types';

const adaptCityToClient = (cityName: CityName): City => ({
  name: cityName,
  location: CityLocation[cityName],
});

export const adaptUserToClient = (user: UserRdo): User => ({
  name: user.name,
  avatarUrl: user.avatarUrl,
  type: (user.type === UserTypeDto.Pro) ? UserType.Pro : UserType.Regular,
  email: user.email,
});

export const adaptPreviewOffersToClient =
  (offers: OfferPreviewRdo[]): Offer[] =>
    offers
      .map((offer: OfferPreviewRdo) => ({
        id: offer.id,
        price: offer.price,
        rating: offer.rating,
        title: offer.title,
        isPremium: offer.premium,
        isFavorite: offer.favorite,
        city: adaptCityToClient(offer.city),
        location: CityLocation[offer.city],
        previewImage: offer.previewImage,
        type: offer.type,
        bedrooms: offer.bedrooms,
        description: offer.description,
        goods: offer.goods,
        host: adaptUserToClient(offer.author),
        images: offer.images,
        maxAdults: offer.maxAdults,
      }));

export const adaptOfferToClient = (offer: OfferRdo): Offer => ({
  id: offer.id,
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  isPremium: offer.premium,
  isFavorite: offer.favorite,
  city: adaptCityToClient(offer.city),
  location: CityLocation[offer.city],
  previewImage: offer.previewImage,
  type: offer.type,
  bedrooms: offer.bedrooms,
  description: offer.description,
  goods: offer.goods,
  host: adaptUserToClient(offer.author),
  images: offer.images,
  maxAdults: offer.maxAdults,
});

export const adaptPreviewOfferToClient = (offer: OfferPreviewRdo): Offer => ({
  id: offer.id,
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  isPremium: offer.premium,
  isFavorite: offer.favorite,
  city: adaptCityToClient(offer.city),
  location: CityLocation[offer.city],
  previewImage: offer.previewImage,
  type: offer.type,
  bedrooms: offer.bedrooms,
  description: offer.description,
  goods: offer.goods,
  host: adaptUserToClient(offer.author),
  images: offer.images,
  maxAdults: offer.maxAdults,
});

export const adaptCommentsToClient =
  (comments: CommentRdo[]): Comment[] =>
    comments
      .map((comment: CommentRdo) => ({
        id: comment.id,
        comment: comment.text,
        date: comment.date,
        rating: comment.rating,
        user: adaptUserToClient(comment.author)
      }));

export const adaptCommentToClient = (comment: CommentRdo): Comment => ({
  id: comment.id,
  comment: comment.text,
  date: comment.date,
  rating: comment.rating,
  user: adaptUserToClient(comment.author)
});
