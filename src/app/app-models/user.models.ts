export class User {
  constructor(
    public UserId: number,
    public Email: string,
    public Username: string,
    public FirstName: string,
    public LastName: string,
    public Created: Date,
    public UserRoleId: number
  ) { }
}