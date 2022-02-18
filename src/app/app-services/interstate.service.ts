import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterstateService {

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  // **************************************************************************
  // Routing
  private previousUrl: string = '';
  private currentUrl: string = '';
  public getPreviousUrl() {
    return this.previousUrl;
  }

  // **************************************************************************
  // Sidebar Buttons
  sidebar = new BehaviorSubject<string>('accounts');
  sidebarAddMode = new BehaviorSubject<boolean>(false);
  sidebarEditMode = new BehaviorSubject<boolean>(false);

  // **************************************************************************
  // View Content
  viewContent = new BehaviorSubject<string>('ledger');
  setViewContent (data: any) {
    this.viewContent.next(data);
  }

  // **************************************************************************
  // Ledger Action Center
  ledgerContent = new BehaviorSubject<string>('ledger');
  setLedgerContent(data: any) {
    this.ledgerContent.next(data);
  }
  filterMode = new BehaviorSubject<boolean>(false);
  // setfilterMode(data) {
  //   this.transactionMode.next(data);
  // }

  // **************************************************************************
  // Ledger Toolbar
  ledgerToolbarMode = new BehaviorSubject<string>('transaction');
  setLedgerToolbarMode(data: any) {
    this.ledgerToolbarMode.next(data);
  }

  // **************************************************************************
  // ledger transaction to edit
  editTransaction = new Subject();
  setEditTransaction(transaction: any) {
    this.editTransaction.next(transaction);
  }
  getEditTransaction() {
    return this.editTransaction.asObservable();
  }

  // **************************************************************************
  // Account Input Vertical

}
