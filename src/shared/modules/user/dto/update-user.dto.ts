import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { TUserType } from '../../../types/index.js';
import { USER_DTO_SETTINGS } from '../../index.js';

export class UpdateUserDto {
  @IsOptional()
  @Length(USER_DTO_SETTINGS.NAME_MIN, USER_DTO_SETTINGS.NAME_MAX)
  public name?: string;

  @IsOptional()
  @IsEnum(TUserType, { message: USER_DTO_SETTINGS.TYPE_MSG })
  public type?: TUserType;

  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsString()
  public avatarUrl?: string;

  @IsOptional()
  @IsArray()
  public favorites?: string[];
}
