import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { TUserType } from '../../../types/user-type.enum.js';
import { USER_DTO } from '../user.constant.js';

export class UpdateUserDto {
  @IsOptional()
  @Length(USER_DTO.NAME_MIN, USER_DTO.NAME_MAX)
  public name?: string;

  @IsOptional()
  @IsEnum(TUserType, { message: USER_DTO.TYPE_MSG })
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
