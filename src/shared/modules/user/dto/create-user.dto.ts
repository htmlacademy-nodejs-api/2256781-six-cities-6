import {
  IsEmail,
  IsEnum,
  IsString,
  Length,
} from 'class-validator';
import { TUserType } from '../../../types/index.js';
import { USER_DTO_SETTINGS } from '../../index.js';

export class CreateUserDto {
  @IsString()
  @Length(USER_DTO_SETTINGS.NAME_MIN, USER_DTO_SETTINGS.NAME_MAX)
  public name!: string;

  @IsEnum(TUserType, { message: USER_DTO_SETTINGS.TYPE_MSG })
  public type!: TUserType;

  @IsEmail()
  public email!: string;

  @IsString()
  @Length(USER_DTO_SETTINGS.PASSWORD_MIN, USER_DTO_SETTINGS.PASSWORD_MAX)
  public password!: string;
}
