import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TransactionFilter } from '../app-models/transaction-models';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private app: AppService
  ) { }

  public filterBase: TransactionFilter ={
    UserId: this.app.getUserId(),
    DateOf: null,
    AccountId: null,
    Location: null,
    CategoryId: null,
    SubcategoryId: null,
    Information: null
  };

  filterData = new BehaviorSubject<TransactionFilter>(this.filterBase);

  // DateOf
  setDateOf(data) {
    this.filterBase.DateOf = data;
  }
  resetDateOf() {
    this.filterBase.DateOf = null;
  }

  // AccountId
  setAccountId(data) {
    this.filterBase.AccountId = data;
  }
  resetAccountId() {
    this.filterBase.AccountId = null;
  }

  // Location
  setLocation(data) {
    this.filterBase.Location = data;
  }
  resetLocation() {
    this.filterBase.Location = null;
  }

  // CategoryId
  setCategoryId(data) {
    this.filterBase.CategoryId = data;
  }
  resetCategoryId() {
    this.filterBase.CategoryId = null;
  }

  // SubcategoryId
  setSubcategoryId(data) {
    this.filterBase.SubcategoryId = data;
  }
  resetSubcategoryId() {
    this.filterBase.SubcategoryId = null;
  }

  // Information
  setInformation(data) {
    this.filterBase.Information = data;
  }
  resetInformation() {
    this.filterBase.Information = null;
  }


}
