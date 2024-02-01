import { IUser, TUserType } from '../../types/index.js';

export class UserEntity implements IUser {
  constructor(
    public name: string,
    public type: TUserType,
    public avatarUrl: string,
    public email: string,
    public password: string,
  ) { }
}
