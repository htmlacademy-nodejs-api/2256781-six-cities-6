// export const adaptCategoriesToClient =
//   (categories: CategoryDto[]): Categories =>
//     categories
//       .map((category: CategoryDto) => ({
//         id: category.id,
//         title: category.name,
//         image: category.image,
//         itemsCount: Number(category.offerCount),
//       }));

// import CreateCommentDto from '../dto/comment/create-comment.dto';
// import { Comment } from '../types/types';

// export const adaptLoginToClient =
//   (user: UserWithTokenDto): User => ({
//     name: user.firstname,
//     surname: user.lastname,
//     email: user.email,
//     avatar: user.avatarPath,
//     token: user.token,
//   });

// export const adaptUserToClient =
//   (user: UserDto): User => ({
//     name: user.firstname,
//     surname: user.lastname,
//     email: user.email,
//     avatar: user.avatarPath,
//   });

// export const adaptOffersToClient =
//   (offers: OfferDto[]): Tickets =>
//     offers
//       .filter((offer: OfferDto) =>
//         offer.user !== null,
//       )
//       .map((offer: OfferDto) => ({
//         id: offer.id,
//         title: offer.title,
//         description: offer.description,
//         publishedDate: offer.postDate,
//         image: offer.image,
//         type: offer.type,
//         commentsCount: offer.commentCount,
//         user: adaptUserToClient(offer.user),
//         categories: adaptCategoriesToClient(offer.categories),
//         price: offer.price,
//       }));

// export const adaptCommentsToClient =
//   (comments: CreateCommentDto[]): Comment[] =>
//     comments
//       .map((comment: CreateCommentDto) => ({
//         id: comment.id,
//         text: comment.text,
//         publishedDate: comment.postDate,
//         user: adaptUserToClient(comment.user),
//       }));
