export class Admin {
  constructor(
    public AdminName: string
  ) { }
  
}

export interface AdminLogin {
  AdminName: string;
  AdminPassword: string;
}

export interface AdminTopics {
  Id: number;
  Title: string;
  DisplayTitle: string;
  Information: string;
}

export interface NavbarTopics {
  Id: number;
  Title: string;
  DisplayTitle: string;
  Information: string;
}

export interface NavbarLink {
  Id: number;
  Title: string;
  DisplayTitle: string;
  Information: string;
  LinkText: string;
  Disabled: boolean; 
}

