import { TUserType } from '../../../types/user-type.enum.js';

export class CreateUserDto {
  constructor(
    public name: string,
    public type: TUserType,
    public email: string,
    public password: string,
    public avatarUrl?: string,
  ) { }
}
