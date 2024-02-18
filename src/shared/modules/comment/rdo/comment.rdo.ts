import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../../modules/index.js';

export class CommentRdo {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'createdAt' })
  public date!: string;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public author!: UserRdo;
}
