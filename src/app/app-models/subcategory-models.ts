export interface SubcategoryDataRequest {
    UserId: number;
    CategoryId: number;
}

export interface Subcategory {
    SubcategoryId: number;
    SubcategoryTitle: string;
    InformationId: number;
    Information: string;
    Created: Date;
    Budget: number;
    MonthToDate: number;
    LastMonth: number;
}


// export class SubcategoryDataRequest {
//     public SubcategoryDataRequest(UserId: number, CategoryId: number) {
//         this.UserId = UserId;
//         this.CategoryId = CategoryId;
//     }
//     public UserId: number;
//     public CategoryId: number;
// }

// export class SubcategoryData {
//     public SubcategoryData(SubcategoryId: number, SubcategoryName: string, Information: string) {
//         this.SubcategoryId = SubcategoryId;
//         this.SubcategoryName = SubcategoryName;
//         this.Information = Information
//     }
//     public SubcategoryId: number;
//     public SubcategoryName: string;
//     public Information: string;
// }