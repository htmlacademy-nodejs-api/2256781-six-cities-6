import { IUser } from './index.js';

export type TComment = {
  text: string;
  date: string;
  rating: number;
  user: IUser;
}
