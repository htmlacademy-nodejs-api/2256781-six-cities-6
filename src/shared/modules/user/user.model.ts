import { Schema, Document, model } from 'mongoose';
import { IUser } from '../../types/index.js';

export interface UserDocument extends IUser, Document { }

const userSchema = new Schema({
  email: String,
  avatarPath: String,
  firstname: String,
  lastname: String,
});

export const UserModel = model<UserDocument>('User', userSchema);
