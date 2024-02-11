import { CreateCommentDto } from '../index.js';
import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from '../index.js';

export interface ICommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
