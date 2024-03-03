import { UserType } from '../const';
import CreateCommentDto from '../dto/comment/create-comment.dto';
import CreateOfferDto from '../dto/offer/create-offer.dto';
import CreateUserDto, { UserTypeDto } from '../dto/user/create-user.dto';
import { NewOffer, UserRegister } from '../types/types';
import { Comment } from '../types/types';
import { getTime } from '../utils';

export const adaptSignupToServer =
  (user: UserRegister): CreateUserDto => ({
    name: user.name,
    email: user.email,
    password: user.password,
    type: (user.type === UserType.Pro) ? UserTypeDto.Pro : UserTypeDto.Standard,
  });

export const adaptOfferToServer =
  (ticket: NewOffer): CreateOfferDto => ({
    title: ticket.title,
    date: getTime(),
    description: ticket.description,
    city: ticket.city.name,
    previewImage: '',
    images: [],
    premium: ticket.isPremium,
    favorite: false,
    type: ticket.type,
    bedrooms: ticket.bedrooms,
    maxAdults: ticket.maxAdults,
    price: ticket.price,
    goods: ticket.goods,
    userId: '',
    location: ticket.location,
  });

export const adaptCreateCommentToServer =
  (comment: Comment): CreateCommentDto => ({
    text: comment.comment,
    rating: comment.rating,
    offerId: comment.id,
    userId: '',
  });

// export const adaptAvatarToServer =
//   (file: string) => {
//     const formData = new FormData();
//     formData.set('avatar', file);

//     return formData;
//   };

// export const adaptImageToServer =
//   (file: string) => {
//     const formData = new FormData();
//     formData.set('image', file);

//     return formData;
//   };
