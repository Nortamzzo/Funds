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
  AdminTopicsId: number;
  Title: string;
  DisplayTitle: string;
  Information: string;
}

export interface NavbarTopics {
  NavbarSettingsId: number;
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
  Enabled: boolean; 
}

export interface SidebarTopics {
  SidebarSettingsId: number;
  Title: string;
  DisplayTitle: string;
  Information: string;
}

