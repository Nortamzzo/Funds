export interface ReceiptData {
  ReceiptId: number;
  TransactionId: number;
  DateOf: Date;
  LocationTitle: string;
  Tax: number;
  Amount: number;
  Information: string;
}

export interface ReceiptItemData {
  ReceiptId: number;
  ReceiptItemId: number;
  ItemId: number;
  ItemTitle: string;
  Quantity: number;
  Amount: number;
  Information: string;
}

export interface ReceiptItemDeleteRequest {
  UserId: number;
  ReceiptItemId: number;
}