enum TUserType {
  Pro = 'pro',
  Standard = 'обычный',
}

export default class UpdateUserDto {
  public name?: string;

  public type?: TUserType;

  public email?: string;

  public avatarUrl?: string;

  public favorites?: string[];
}
