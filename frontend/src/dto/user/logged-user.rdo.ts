import { UserTypeDto } from './create-user.dto.js';

export default class LoggedUserRdo {
  public email!: string;

  public name!: string;

  public avatarUrl!: string;

  public type!: UserTypeDto;

  public token!: string;
}
