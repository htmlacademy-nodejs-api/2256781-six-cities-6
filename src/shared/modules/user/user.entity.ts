import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { IUser, TUserType } from '../../types/index.js';

export class UserEntity extends defaultClasses.TimeStamps implements IUser {
  @prop({ required: true, default: '' })
  public name!: string;

  @prop({ required: true, default: 'обычный' })
  public type!: TUserType;

  @prop({ required: false, default: '' })
  public avatarUrl?: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({ required: true, default: '' })
  public password!: string;

}

export const UserModel = getModelForClass(UserEntity);
