import { TUserType } from './index.js';

export interface IUser {
  name: string;
  type: TUserType;
  avatarUrl?: string;
  email: string;
  password: string;
}
