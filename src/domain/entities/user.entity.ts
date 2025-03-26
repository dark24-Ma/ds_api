export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public firstname: string,
    public resetToken?: string,
    public resetTokenExpiration?: number,

  ) {}
}
