import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionFilter } from '../app-models/transaction-models';
import { AppService } from './app.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filterDateStatus = new BehaviorSubject<boolean>(false);
  public filterAccountStatus = new BehaviorSubject<boolean>(false);
  public filterLocationStatus = new BehaviorSubject<boolean>(false);
  public filterCategoryStatus = new BehaviorSubject<boolean>(false);
  public filterSubcategoryStatus = new BehaviorSubject<boolean>(false);


  constructor(
    private app: AppService,
    private notif: NotificationService
  ) { }

  public filterBase: TransactionFilter = {
    UserId: this.app.getUserId(),
    DateOf: null,
    DateMin: null,
    DateMax: null,
    DateMonth: null,
    DateYear: null,
    AccountId: null,
    Location: null,
    CategoryId: null,
    SubcategoryId: null,
    Information: null
  };

  /**
   * 
   */
  filterData = new BehaviorSubject<TransactionFilter>(this.filterBase);

  /**
   * 
   */
  setFilterData() {
    this.filterData.next(this.filterBase);
  }
  /**
   * get filterData for getTransactions()
   * @returns object of filter items
   */
  getFilterData() {
    return this.filterData.asObservable();
  }
  resetFilterData() {
    this.filterBase.DateOf = null;
    this.filterBase.DateMin = null;
    this.filterBase.DateMax = null;
    this.filterBase.DateMonth = null;
    this.filterBase.DateYear = null;
    this.filterBase.AccountId = null;
    this.filterBase.Location = null;
    this.filterBase.CategoryId = null;
    this.filterBase.SubcategoryId = null;
    this.filterBase.Information = null;
    this.filterData.next(this.filterBase);
    this.notif.sendTransNotif(true);
  }

  // DateOf
  setDateOf(data: Date) {
    this.filterBase.DateOf = data;
    this.notif.sendTransNotif(true);
  }
  /**
   * set DateOf to null
   */
  resetDateOf() {
    this.filterBase.DateOf = null;
    this.notif.sendTransNotif(true);
  }

  // DateMin
  setDateMin(data: string) {
    this.filterBase.DateMin = data;
    this.notif.sendTransNotif(true);
    this.filterDateStatus.next(true);
  }
  resetDateMin() {
    this.filterBase.DateMin = null;
    this.notif.sendTransNotif(true);
    this.filterDateStatus.next(false);
  }

  // DateMax
  setDateMax(data: string) {
    this.filterBase.DateMax = data;
    this.notif.sendTransNotif(true);
  }
  resetDateMax() {
    this.filterBase.DateMax = null;
    this.notif.sendTransNotif(true);
  }

  setDateRange(dateMin: string, dateMax: string) {
    console.log(dateMin, ' : ', dateMax)
    this.filterBase.DateMin = dateMin;
    this.filterBase.DateMax = dateMax;
    this.notif.sendTransNotif(true);
    this.filterDateStatus.next(true);
  }

  resetDateRange() {
    this.filterBase.DateMin = null;
    this.filterBase.DateMax = null;
    this.notif.sendTransNotif(true);
    this.filterDateStatus.next(false);
  }

  // Month
  /**
   * sets dateMonth
   * @param data 
   */
  setDateMonth(data: string | null) {
    this.filterBase.DateMonth = data;
    this.notif.sendTransNotif(true);
  }
  /**
   * set dateMonth to null
   */
  resetDateMonth() {
    this.filterBase.DateMonth = null;
    this.notif.sendTransNotif(true);
  }

  // Year
  /**
   * set dateYear
   * @param data 
   */
  setDateYear(data: number | null) {
    this.filterBase.DateYear = data;
    this.notif.sendTransNotif(true);
  }
  /**
   * set dateYear to null
   */
  resetDateYear() {
    this.filterBase.DateYear = null;
    this.notif.sendTransNotif(true);
  }

  // AccountId
  /**
   * set AccountId
   * @param data number = account id number
   */
  setAccountId(data: number | null) {
    this.filterBase.AccountId = data;
    this.notif.sendTransNotif(true);
    this.filterAccountStatus.next(true);
  }
  /**
   * set AccountId to null
   */
  resetAccountId() {
    this.filterBase.AccountId = null;
    this.notif.sendTransNotif(true);
    this.filterAccountStatus.next(false);
  }

  // Location
  /**
   * set Location
   * @param data string = location to filter
   */
  setLocation(data: string | null) {
    this.filterBase.Location = data;
    this.notif.sendTransNotif(true);
    this.filterLocationStatus.next(true);
  }
  /**
   * set Location to null
   */
  resetLocation() {
    this.filterBase.Location = null;
    this.notif.sendTransNotif(true);
    this.filterLocationStatus.next(false);
  }

  // CategoryId
  /**
   * set Category
   * @param data number = category id number
   */
  setCategoryId(data: number) {
    this.filterBase.CategoryId = data;
    this.notif.sendTransNotif(true);
    this.filterCategoryStatus.next(true);
    
  }
  /**
   * set CategoryId to null
   */
  resetCategoryId() {
    this.filterBase.CategoryId = null;
    this.notif.sendTransNotif(true);
    this.filterCategoryStatus.next(false);
  }

  // SubcategoryId
  /**
   * set SubcategoryId
   * @param data number = subcategory id number
   */
  setSubcategoryId(data: number) {
    this.filterBase.SubcategoryId = data;
    this.notif.sendTransNotif(true);
    this.filterSubcategoryStatus.next(true);
  }
  /**
   * set SubcategoryId to null
   */
  resetSubcategoryId() {
    this.filterBase.SubcategoryId = null;
    this.notif.sendTransNotif(true);
    this.filterSubcategoryStatus.next(false);
  }

  // Information
  /**
   * set Information
   * @param data string = informtion (text)
   */
  setInformation(data: string) {
    this.filterBase.Information = data;
    this.notif.sendTransNotif(true);
  }
  /**
   * set Information to null
   */
  resetInformation() {
    this.filterBase.Information = null;
    this.notif.sendTransNotif(true);
  }
}