export class User {
  constructor(
    public UserId: number,
    public Email: string,
    public FirstName: string,
    public LastName: string,
    public Created: Date,
    public UserRole: number
  ) { }
}