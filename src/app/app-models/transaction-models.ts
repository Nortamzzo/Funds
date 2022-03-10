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
    DateMin?: string | null;
    DateMax?: string | null;
    DateMonth?: string | null;
    DateYear?: number | null;
    AccountId?: number | null;
    Location?: string | null;
    CategoryId?: number | null;
    SubcategoryId?: number | null;
    Information?: string | null;
}

export interface ReceiptList {
    ReceiptId: number;
    TransactionId: number;
    DateOf: Date;
    LocationTitle: string;
    Amount: number;
}

export interface NoReceiptList {
    TransactionId: number;
    DateOf: Date;
    LocationTitle: string;
    Amount: number;
}

export interface Receipt {
    ReceiptId: number;
    TransactionId: number;
    LocationTitle: string;
    DateOf: Date;
    Information: string;
}
