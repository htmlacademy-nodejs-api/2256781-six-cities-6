import { IsEmail, IsString, Length } from 'class-validator';
import { USER_DTO_SETTINGS } from '../../index.js';

export class LoginUserDto {
  @IsEmail()
  public email!: string;

  @IsString()
  @Length(USER_DTO_SETTINGS.PASSWORD_MIN, USER_DTO_SETTINGS.PASSWORD_MAX)
  public password!: string;
}
