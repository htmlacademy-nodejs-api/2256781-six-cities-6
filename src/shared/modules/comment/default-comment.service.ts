import { inject, injectable } from 'inversify';
import { ICommentService } from '../index.js';
import { Component, SortType } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from '../index.js';
import { CreateCommentDto } from '../index.js';
import { ILogger } from '../../libs/index.js';
import { DEFAULT_COMMENT_COUNT } from '../index.js';

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) { }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.offerId}`);

    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = !count || count > DEFAULT_COMMENT_COUNT ? DEFAULT_COMMENT_COUNT : count;
    return this.commentModel
      .find({ offers: offerId }, {}, { limit })
      .Sort({ createAt: SortType.Down })
      .populate(['userId', 'offerId'])
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }
}
