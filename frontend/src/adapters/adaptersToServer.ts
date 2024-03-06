import CreateCommentDto from '../dto/comment/create-comment.dto';
import CreateOfferDto from '../dto/offer/create-offer.dto';
import UpdateOfferDto from '../dto/offer/update-offer.dto';
import { CommentAuth, NewOffer, Offer } from '../types/types';
import { getTime } from '../utils';

export const adaptNewOfferToServer =
  (ticket: NewOffer): CreateOfferDto => ({
    title: ticket.title,
    date: getTime(),
    description: ticket.description,
    city: ticket.city.name,
    previewImage: ticket.previewImage,
    images: ticket.images,
    premium: ticket.isPremium,
    favorite: false,
    type: ticket.type,
    bedrooms: ticket.bedrooms,
    maxAdults: ticket.maxAdults,
    price: ticket.price,
    goods: ticket.goods,
    location: ticket.location,
  });

export const adaptCreateCommentToServer =
  (comment: CommentAuth): CreateCommentDto => ({
    text: comment.comment,
    rating: comment.rating,
    offerId: comment.id,
    date: getTime(),
  });

export const adaptOfferToServer = (offer: Offer): UpdateOfferDto => ({
  title: offer.title,
  description: offer.description,
  city: offer.city.name,
  previewImage: offer.previewImage,
  images: offer.images,
  premium: offer.isPremium,
  favorite: offer.isFavorite,
  rating: offer.rating,
  type: offer.type,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  price: offer.price,
  goods: offer.goods,
  location: offer.location,
});
