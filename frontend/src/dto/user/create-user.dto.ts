enum TUserType {
  Pro = 'pro',
  Standard = 'обычный',
}

export default class CreateUserDto {
  public name!: string;

  public type!: TUserType;

  public email!: string;

  public password!: string;
}
