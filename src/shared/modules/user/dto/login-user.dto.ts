import { IsEmail, IsString, Length } from 'class-validator';
import { USER_DTO } from '../user.constant.js';

export class LoginUserDto {
  @IsEmail()
  public email!: string;

  @IsString()
  @Length(USER_DTO.PASSWORD_MIN, USER_DTO.PASSWORD_MAX)
  public password!: string;
}
