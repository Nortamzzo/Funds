import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Account } from '@app/app-models/account-models';
import { Category } from '@app/app-models/category-models';
import { ColumnData } from '@app/app-models/response.model';
import { Subcategory } from '@app/app-models/subcategory-models';
import { Transaction } from '@app/app-models/transaction-models';
import { CategoryService } from '@app/app-services/data/category.service';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { TransactionService } from '@app/app-services/data/transaction.service';
import { NotificationService } from '@app/app-services/notification.service';

export interface header {
  name: string;
  width: number;
}

@Component({
  selector: 'app-ledger-table',
  templateUrl: './ledger-table.component.html',
  styleUrls: ['./ledger-table.component.scss']
})
export class LedgerTableComponent implements OnInit {
  @Output() callDeleteTransaction = new EventEmitter();
  @Output() callGetSubcategoryData = new EventEmitter();
  @Output() callUpdateTransaction = new EventEmitter();
  @Input() public data: Transaction[] = [];
  @Input() public transactionData: Transaction[] = [];
  @Input() public accountData: Account[] = [];
  @Input() public categoryData: Category[] = [];
  @Input() public subcategoryData: Subcategory[] = [];
  @Input() public locationData: Location[] = [];
  @Input() public tableStyle: string[] = [];
  @Input() public columns: any[] = [];
  @Input() public editable: boolean = false;
  @Input() public total: number = 0;
  public page: number = 1;
  public pageSize: number = 100;
  public maxSize: number = 0;
  public collectionSize: number = 0;
  public editRow: number | null = null;
  public editCol: number | null = null;
  public focusedRow: number | null = null;
  public exnapdAll: boolean = false;
  public sort: boolean = false;
  public sortedCol: string | null = null;
  public sortUp: boolean = true;
  public hoveredIndex: number | null = null;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.focusedRow) {
      this.focusedRow = null;
    }
    if (event.key === 'Escape' && this.editRow) {
      this.editRow = null;
      this.editCol = null;
    }
  }

  constructor(
    private notif: NotificationService,
    private transService: TransactionService,
    private catService: CategoryService,
    private subService: SubcategoryService
  ) {
    this.notif.getSortStatus().subscribe(
      data => {
        if (data) {
          this.sort = true;
        }
      }
    )
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.maxSize = this.transactionData.length;
      this.collectionSize = (this.transactionData.length / 10);
    }, 250);
  }

  /**
   * 
   * @param row row index
   * @param col column index
   */
  edit(row: number, col: number) {
    this.editRow = row;
    this.editCol = col;
  }

  /**
   * 
   * @param row row index
   */
  setFocusedRow(row: any) {
    if (this.focusedRow != row) {
      this.focusedRow = row;
    } else {
      this.focusedRow = null;
    }
  }

  /**
   * Gets category data from db
   */
  getCategoryData() {
    this.catService.getCategoryData().subscribe(
      data => {
        this.categoryData = data.Value;
      }
    )
  }

  /**
   * Gets subcategory data for selected category id
   * @param data CategoryId
   */
  getSubcategoryData(data: any) {
    this.subService.getSubcategoryDataByCatId(data).subscribe(
      data => {
        this.subcategoryData = data.Value;
      }
    )
  }

  /**
   * Disables TransactionId after confirm alert
   * @param data TransactionId
   */
  deleteTransaction(data: any) {
    if (confirm("Delete Transaction?")) {
      this.callDeleteTransaction.emit(data);
      this.editRow = null
      this.editCol = null;
    }
  }

  /**
   * 
   */
  cancel() {
    this.focusedRow = null;
    this.editRow = null
    this.editCol = null;
  }

  /**
   * Cancels update information but keeps expanded row open
   */
  cancelInformation() {
    this.editCol = null;
  }

  updateCategory(row: any) {
    console.log(row)
  }

  /**
   * Updates transaction with value on selected row and column
   * @param value update value
   * @param transactionId update row
   * @param column update column
   */
  updateTransaction(
    value: any,
    transactionId: number,
    column: string
  ) {
    let data = {
      transactionId: transactionId,
      column: column,
      value: value
    }
    console.log(data)
    this.transService.updateTransaction(data).subscribe();
    this.editRow = null;
    this.editCol = null;
  }

  /**
   * Sorts column DESC then ASC
   * TODO: Sort back to default on third click
   * @param value column
   */
  setSort(value: string) {
    this.notif.setSortStatus(true);
    this.sortedCol = value;
    this.sortUp = !this.sortUp;
  }

  /**
   * Resets all sort
   */
  resetSort() {
    this.notif.sendTransNotif(true);
    this.sort = false;
    this.sortedCol = null;
    this.sortUp = false;
  }

  /**
   * Sets transaction reconcile true
   * @param transactionId 
   */
  reconcileTransaction(transactionId: number) {
    this.transService.reconcileTransaction(transactionId).subscribe();
  }

  /**
   * Sets transaction reconcile false
   * @param transactionId 
   */
  unreconcileTransaction(transactionId: number) {
    this.transService.unreconcileTransaction(transactionId).subscribe();
  }

}
