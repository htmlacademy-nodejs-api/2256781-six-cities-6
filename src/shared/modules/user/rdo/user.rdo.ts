import { Expose } from 'class-transformer';
import { TUserType } from '../../../types/user-type.enum.js';

export class UserRdo {
  @Expose()
  public name!: string;

  @Expose()
  public type!: TUserType;

  @Expose()
  public email!: string;

  @Expose()
  public avatarUrl!: string;
}
