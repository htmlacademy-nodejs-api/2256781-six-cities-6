import { Schema, Document, model } from 'mongoose';
import { IUser } from '../../types/index.js';

export interface IUserDocument extends IUser, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  avatarPath: String,
  firstname: String,
  lastname: String,
}, { timestamps: true });

export const UserModel = model<IUserDocument>('User', userSchema);
