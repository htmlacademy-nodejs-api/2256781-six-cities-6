import { OfferEntity, UserEntity, CommentEntity } from './index.js';
import { getModelForClass } from '@typegoose/typegoose';

export const UserModel = getModelForClass(UserEntity);
export const OfferModel = getModelForClass(OfferEntity);
export const CommentModel = getModelForClass(CommentEntity);
