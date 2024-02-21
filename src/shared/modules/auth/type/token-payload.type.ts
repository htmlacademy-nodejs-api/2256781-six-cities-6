import { TUserType } from '../../../types/index.js';

export type TTokenPayload = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  type?: TUserType;
};
