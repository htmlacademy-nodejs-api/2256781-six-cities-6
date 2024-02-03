export class CreateUserDto {
  constructor(public name: string,
    public type: string,
    public avatarUrl: string,
    public email: string,
    public password: string) { }
}
