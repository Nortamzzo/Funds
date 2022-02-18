export interface PresetTransaction {
    UserId: number;
    PresetTransactionId: number;
    PresetName: string;
    DateOf: Date;
    Amount: number;
    AccountId: number;
    AccountTitle: string;
    LocationId: number;
    LocationTitle: string;
    CategoryId: number;
    CategoryTitle: string;
    Flow: string;
    SubcategoryId: number;
    SubcategoryTitle: string;
    InformationId: number;
    Information: string;
}

export interface PresetCreate {
    UserId?: number;
    PresetTitle: string;
    Amount: number;
    AccountId: number;
    Location: string;
    CategoryId: number;
    SubcategoryId: number;
    Information: string;
}

export interface PresetSubmit {
    UserId?: number;
    DateOf: Date;
    Amount: number;
    AccountId: number;
    LocationTitle: string;
    CategoryId: number;
    SubcategoryId: number;
    Information: string;
}

export interface PresetList {
    PresetTitle: string;
    DateOf: string;
    Amount: string;
}