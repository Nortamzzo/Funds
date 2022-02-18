export interface AccountDataRequest {
    UserId: number;
    AccountId: number;
}

export interface Account {
    AccountCategory: string;
    AccountCategoryId: number;
    AccountId: number;
    AccountTitle: string;
    AccountType: string;
    AccountTypeId: number;
    Balance: number;
    Information: string;
    InformationId: number;
    StartAmount: number;
    Tracking: boolean;
    UserId: number;
    ThisMonth: number;
    LastMonth: number;
    Future: number;
    OpenDate: Date;
}