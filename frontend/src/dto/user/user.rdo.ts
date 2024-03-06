import { UserTypeDto } from './create-user.dto';

export default class UserRdo {
  public id!: string;

  public name!: string;

  public type!: UserTypeDto;

  public email!: string;

  public avatarUrl!: string;
}
