export interface LoginData {
  UserId: number;
  Email: string;
  FirstName: string;
  LastName: string;
}

export interface SignupData {
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
}

export interface LoginData {
  Email: string;
  Password: string;
}

export class LoginD {
  constructor(
      public Email: string,
      public Password: string
  ) { }
}

export class UserData {
  constructor(
    public UserId: number,
    public Email: string,
    public FirstName: string,
    public LastName: string,
    public Created: Date
  ) { }
  public getUserId() {
    return this.UserId;
   }
}