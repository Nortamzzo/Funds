export interface CategoryDataRequest {
    UserId: string;
    CategoryId?: string;
}

export interface Category {
    CategoryId: number;
    CategoryTitle: string;
    FlowId: number;
    Flow: string;
    InformationId: number;
    Information: string;
    ViewOrder: number;
    Created: Date;
    Budget: number;
    MonthToDate: number;
    LastMonth: number;
}

export interface CategoryBudget {
    CategoryId: number;
    CategoryTitle: string;
    FlowId: number;
    Flow: string;
    InformationId: number;
    Information: string;
    ViewOrder: number;
    Created: Date;
    Budget: number;
    January: number;
    February: number;
    March: number;
    April: number;
    May: number;
    June: number;
    July: number;
    August: number;
    September: number;
    October: number;
    November: number;
    December: number;
}