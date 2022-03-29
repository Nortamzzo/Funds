import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Account } from '@app/app-models/account-models';
import { Category } from '@app/app-models/category-models';
import { ColumnData } from '@app/app-models/response.model';
import { Subcategory } from '@app/app-models/subcategory-models';
import { Transaction } from '@app/app-models/transaction-models';
import { Location } from '@app/app-models/location.models';
import { CategoryService } from '@app/app-services/data/category.service';
import { SubcategoryService } from '@app/app-services/data/subcategory.service';
import { TransactionService } from '@app/app-services/data/transaction.service';
import { FilterService } from '@app/app-services/filter.service';
import { NotificationService } from '@app/app-services/notification.service';
import { DatePipe } from '@angular/common';

import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { NewTransactionModalComponent } from '../new-transaction-modal/new-transaction-modal.component';

export interface header {
  name: string;
  width: number;
}

@Component({
  selector: 'app-ledger-table',
  templateUrl: './ledger-table.component.html',
  styleUrls: ['./ledger-table.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LedgerTableComponent implements OnInit {
  @ViewChild('picker') picker: any;
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
  public dateRangeMin: Date | null = null;
  public dateRangeMax: Date | null = null;
  public dateMin: string | null = null;
  public dateMax: string | null = null;
  public dateFiltered: boolean = false;
  public accountFiltered: boolean = false;
  public locationFiltered: boolean = false;
  public categoryFiltered: boolean = false;
  public subcategoryFiltered: boolean = false;
  private modalOptions: NgbModalOptions;
  private closeResult: string;
  

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
    private subService: SubcategoryService,
    private filterService: FilterService,
    private datePipe: DatePipe,
    private modalService: NgbModal
  ) {
    this.notif.getSortStatus().subscribe(
      data => {
        if (data) {
          this.sort = true;
        }
      }
    ),
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.maxSize = this.transactionData.length;
      this.collectionSize = (this.transactionData.length / 10);
    }, 250);
    this.getDateRange();
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

  getDateRange() {
    this.transService.getDateRange().subscribe(
      data => {
        this.dateRangeMin = new Date(data[0].MinDate);
        this.dateRangeMax = new Date(data[0].MaxDate);
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

  setMinDate(value: string) {
    this.dateMin = value;
    if (this.dateMax) {
      this.filterDates(this.dateMin, this.dateMax);
    } else {
      this.filterDates(this.dateMin, this.dateMin);
    }
  }

  setMaxDate(value: string) {
    this.dateMax = value;
    if (this.dateMin) {
      this.filterDates(this.dateMin, this.dateMax);
    } else {
      this.filterDates(this.dateMax, this.dateMax)
    }
  }

  filterDates(dateFrom: string, dateTo: string) {
    let dateMin = new Date(dateFrom);
    let dateMax = new Date(dateTo);
    this.datePipe.transform(dateMin, "yyyy-MM-dd");
    this.datePipe.transform(dateMax, "yyyy-MM-dd");
    this.filterService.setDateRange(this.datePipe.transform(dateMin, "yyyy-MM-dd"), this.datePipe.transform(dateMax, "yyyy-MM-dd"));
    this.filterService.filterDateStatus.subscribe(
      data => {
        this.dateFiltered = data;
      }
    )
  }

  resetFilterDates() {
    this.dateMin = null;
    this.dateMax = null;
    this.filterService.resetDateMin();
    this.filterService.resetDateMax()
  }

  filterAccounts(accountId: number, accountTitle: string) {
    this.filterService.setAccountId(accountId);
    this.filterService.filterAccountStatus.subscribe(
      data => {
        this.accountFiltered = data;
      }
    )
  }

  resetFilterAccounts() {
    this.filterService.resetAccountId();
  }

  filterLocations(locationId: number, locationTitle: string) {
    this.filterService.setLocation(locationTitle);
    this.filterService.filterLocationStatus.subscribe(
      data => {
        this.locationFiltered = data;
      }
    )
  }

  resetFilterLocations() {
    this.filterService.resetLocation();
  }

  filterCategories(categoryId: number, categoryTitle: string) {
    this.filterService.setCategoryId(categoryId);
    this.filterService.filterCategoryStatus.subscribe(
      data => {
        this.categoryFiltered = data;
      }
    )
  }

  resetFilterCategories() {
    this.filterService.resetCategoryId();
  }

  filterSubcategories(subcategoryId: number, subcategoryTitle: string) {
    this.filterService.setSubcategoryId(subcategoryId);
    this.filterService.filterSubcategoryStatus.subscribe(
      data => {
        this.subcategoryFiltered = data;
      }
    )
  }

  resetFilterSubcategories() {
    this.filterService.resetSubcategoryId();
  }

  openModal(data: any) {
    const modalRef = this.modalService.open(NewTransactionModalComponent, { 
      size: 'xl',
      animation: true,
      windowClass: 'trans-modal'
     });
    modalRef.componentInstance.my_modal_title = 'New Transaction';
    modalRef.componentInstance.my_modal_content = 'Content';
  }


}
