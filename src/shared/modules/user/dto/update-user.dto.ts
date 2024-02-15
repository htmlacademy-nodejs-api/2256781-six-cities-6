import { TUserType } from '../../../types/user-type.enum.js';

export class UpdateUserDto {
  public name?: string;

  public type?: TUserType;

  public email?: string;

  public avatarUrl?: string;

  public favorites?: string[];
}
