import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public activeRoute = new BehaviorSubject<string | null>(null);

  constructor(
    private app: AppService
  ) { }

  setActiveRoute(route: string) {
    this.activeRoute.next(route);
  }
  getActiveRoute() {
    return this.activeRoute.asObservable();
  }

  // LEDGER GENERAL
  private lederUpdateSub = new Subject<any>();
  sendLedgerUpdate(value: any) {
    this.lederUpdateSub.next({ text: value });
  }
  getledgerUpdate() {
    return this.lederUpdateSub.asObservable();
  }

  // FILTER
  private filterSub = new Subject<any>();
  sendFilterNotif(value: boolean) {
    this.filterSub.next({ Boolean: value })
  }
  getFilterNotif() {
    return this.filterSub.asObservable();
  }

  // Transaction
  private transNotifSub = new Subject<any>();
  sendTransNotif(value: any) {
    this.transNotifSub.next({ text: value })
  }
  getTransNotif() {
    return this.transNotifSub.asObservable();
  }

  // Transactions Page
  private transPageSub = new Subject<any>();
  setTransPageSub(page: number) {
    this.transPageSub.next(page);
  }
  getTransPageSub() {
    return this.transPageSub.asObservable();
  }

  // Category
  private submitCategorySub = new Subject<any>();
  sendCategoryNotif(value: any) {
    this.submitCategorySub.next({ text: value })
  }
  getCategoryNotif() {
    return this.submitCategorySub.asObservable();
  }

  // Subcategory
  private submitSubcategorySub = new Subject<any>();
  private submitCategoryId = new Subject<number>();
  sendSubcategoryNotif(value: any) {
    this.submitSubcategorySub.next({ text: value })
  }
  getSubcategoryNotif() {
    return this.submitSubcategorySub.asObservable();
  }
  sendCategoryId(value: number) {
    this.submitCategoryId.next(value)
  }
  getCategoryId() {
    return this.submitCategoryId.asObservable();
  }


  private transactionDataSub = new Subject<any>();
  sendTransactionDataSub(account: number) {
    this.transactionDataSub.next({ account: account });
  }
  getTransactionDataSub() {
    return this.transactionDataSub.asObservable();
  }

  // Preset Transactions
  private presetNotifSub = new Subject<any>();
  sendPresetNotif(value: any) {
    this.presetNotifSub.next({ text: value })
  }
  getPresetNotif() {
    return this.presetNotifSub.asObservable();
  }

  // ACCOUNT
  private accountNotifSub = new Subject<any>();
  sendAccountNotif(value: any) {
    this.accountNotifSub.next({ text: value })
  }
  getAccountNotif() {
    return this.accountNotifSub.asObservable();
  }

  // Preset Transactions
  submitPresetTransaction = new Subject<any>();
  sendPresetTransaction(value: any) {
    this.submitPresetTransaction.next({ text: value })
  }
  getPresetTransaction() {
    return this.submitPresetTransaction.asObservable();
  }

  // Ledger Table
  public sort = new BehaviorSubject<boolean>(false);
  setSortStatus(value: boolean) {
    this.sort.next(value);
  }
  getSortStatus() {
    return this.sort.asObservable();
  }

  // Change Api
  private changeApi = new Subject<any>();
  sendChangeApi(value: any) {
    this.changeApi.next({ text: value });
  }
  getChangeApi() {
    return this.changeApi.asObservable();
  }

  // User Config
  private userConfigSub = new Subject<any>();
  sendUserConfigNotif(value: any) {
    this.userConfigSub.next({ text: value })
  }
  getUserConfigNotif() {
    return this.userConfigSub.asObservable();
  }
}
