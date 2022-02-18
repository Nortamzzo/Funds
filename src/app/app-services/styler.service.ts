import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StylerService {

  constructor() { }

  // Ledger Action Center Height
  LedgerActionCenterHeightDefault: string = '5vh';
  LedgerActionCenterHeight: string = '10vh';
  // LedgerActionCenterHeight = new BehaviorSubject<string>(this.LedgerActionCenterHeightDefault);
  // setLedgerActionCenterHeight(text: string) {
  //   this.LedgerActionCenterHeight.next(text);
  // }
  // Ledger Table height
  LedgerTableHeightDefault: string = '85vh';
  LedgerTableHeight: string = '79vh';
  // LedgerTableHeight = new BehaviorSubject<string>(this.LedgerTableHeightDefault);
  // setLedgerTableHeight(text: string) {
  //   this.LedgerTableHeight.next(text);
  // }
}
