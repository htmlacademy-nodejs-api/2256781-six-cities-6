export enum UserTypeDto {
  Pro = 'pro',
  Standard = 'обычный',
}

export default class CreateUserDto {
  public name!: string;

  public type!: UserTypeDto;

  public email!: string;

  public password!: string;
}
