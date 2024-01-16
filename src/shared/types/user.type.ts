import { TUserType } from './index.js';

export type TUser = {
  name: string;
  type: TUserType;
  avatarUrl?: string;
  email: string;
  password?: string;
}
