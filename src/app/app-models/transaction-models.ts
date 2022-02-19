export interface TransactionDataRequest {
    UserId: number;
    AccountId: number;
}

export interface Transaction {
    AccountId: number;
    AccountTitle: string;
    Amount: number;
    Balance: number;
    CategoryId: number;
    CategoryTitle: string;
    FlowId: number;
    Flow: string;
    Current: string;
    DateOf: Date;
    Information: string;
    InformationId: number;
    LocationTitle: string;
    LocationId: number;
    SubcategoryId: number;
    SubcategoryTitle: string;
    TransactionId: number;
    UserId: number;
    _Expanded?: boolean;
    Reconcile: boolean;
    HasReceipt: boolean;
    Future: string;
}

export interface TransactionTableHeaders {

    }

export interface TransactionSubmission {
    UserId: number;
    DateOf: Date;
    Amount: number;
    AccountId: number;
    LocationTitle?: string;
    CategoryId?: number;
    SubcategoryId?: number;
    Information: string;
}

export interface TransactionFilter {
    UserId?: number | null;
    DateOf?: Date | null;
    DateMin?: Date | null;
    DateMax?: Date | null;
    DateMonth?: string | null;
    DateYear?: number | null;
    AccountId?: number | null;
    Location?: string | null;
    CategoryId?: number | null;
    SubcategoryId?: number | null;
    Information?: string | null;
}