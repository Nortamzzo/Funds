export interface ReceiptData {
  RecipeId: number;
  TransactionId: number;
  DateOf: Date;
  LocationTitle: string;
  Tax: number;
  Amount: number;
}

export interface ReceiptItemData {
  ItemId: number;
  ItemTitle: string;
  Quantity: number;
  Amount: number;
  Information: string;
}