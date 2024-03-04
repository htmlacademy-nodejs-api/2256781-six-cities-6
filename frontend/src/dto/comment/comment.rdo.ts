import UserRdo from '../user/user.rdo';

export default class CommentRdo {
  public id!: string;

  public text!: string;

  public rating!: number;

  public date!: string;

  public author!: UserRdo;
}
