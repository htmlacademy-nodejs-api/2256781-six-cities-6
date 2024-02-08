import { Ref, defaultClasses, modelOptions, prop } from '@typegoose/typegoose';
import { IUser, TUserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/hash.js';
import { OfferEntity } from '../index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
  })
  public name!: string;

  @prop({
    required: true,
    default: TUserType.Standard,
    type: () => String,
  })
  public type!: TUserType;

  @prop({
    required: false,
    default: '',
  })
  public avatarUrl?: string;

  @prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @prop({
    required: true,
    default: '',
  })
  public password!: string;

  @prop({
    ref: () => OfferEntity,
    default: [],
    required: true,
  })
  public favorites!: Ref<OfferEntity>[];

  constructor(userData: IUser) {
    super();

    this.name = userData.name;
    this.type = userData.type;
    this.avatarUrl = userData.avatarUrl;
    this.email = userData.email;
    this.password = userData.password;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}
