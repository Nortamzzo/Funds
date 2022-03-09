export interface INewTransaction {
  DateOf: Date;
  Amount: number;
  AccountId: number;
  LocationTitle: string;
  CategoryId: number;
  SubcategoryId: number;
  Information: string;
}

export interface ITransaction {
  UserId: number;
  TransactionId: number;
  DateOf: Date;
  Amount: number;
  AccountId: number;
  AccountTitle: string;
  LocationId: number;
  LocationTitle: string;
  Information: string;
  CategoryId: number;
  CategoryTitle: string;
  FlowId: number;
  Flow: string;
  SubcategoryId: number;
  SubcategoryTitle: string;
  Balance: number;
  Future: number;
  Reconcile: boolean;
  HasReceipt: boolean;
  Created: Date;
  LastUpdated: Date;
}

class Transaction implements ITransaction {
  public UserId: number;
  public TransactionId: number;
  public DateOf: Date;
  public Amount: number;
  public AccountId: number;
  public AccountTitle: string;
  public LocationId: number;
  public LocationTitle: string;
  public Information: string;
  public CategoryId: number;
  public CategoryTitle: string;
  public FlowId: number;
  public Flow: string;
  public SubcategoryId: number;
  public SubcategoryTitle: string;
  public Balance: number;
  public Future: number;
  public Reconcile: boolean;
  public HasReceipt: boolean;
  public Created: Date;
  public LastUpdated: Date;

  constructor(
    UserId: number,
    TransactionId: number,
    DateOf: Date,
    Amount: number,
    AccountId: number,
    AccountTitle: string,
    LocationId: number,
    LocationTitle: string,
    Information: string,
    CategoryId: number,
    CategoryTitle: string,
    FlowId: number,
    Flow: string,
    SubcategoryId: number,
    SubcategoryTitle: string,
    Balance: number,
    Future: number,
    Reconcile: boolean,
    HasReceipt: boolean,
    Created: Date,
    LastUpdated: Date
  ) {
    this.UserId = UserId;
    this.TransactionId = TransactionId;
    this.DateOf = DateOf;
    this.Amount = Amount;
    this.AccountId = AccountId;
    this.AccountTitle = AccountTitle;
    this.LocationId = LocationId;
    this.LocationTitle = LocationTitle;
    this.Information = Information;
    this.CategoryId = CategoryId;
    this.CategoryTitle = CategoryTitle;
    this.FlowId = FlowId;
    this.Flow = Flow;
    this.SubcategoryId = SubcategoryId;
    this.SubcategoryTitle = SubcategoryTitle;
    this.Balance = Balance;
    this.Future = Future;
    this.Reconcile = Reconcile;
    this.HasReceipt = HasReceipt;
    this.Created = Created;
    this.LastUpdated = LastUpdated;
  }

}