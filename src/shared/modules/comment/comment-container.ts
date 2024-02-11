import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { ICommentService } from '../index.js';
import { Component } from '../../types/index.js';
import { DefaultCommentService } from '../index.js';
import { CommentEntity } from '../index.js';
import { CommentModel } from '../index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<ICommentService>(Component.CommentService).to(DefaultCommentService);
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
