import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TransactionDataRequest, TransactionFilter, TransactionSubmission } from 'src/app/app-models/transaction-models';
import { AppService } from '../app.service';
import { FilterService } from '../filter.service';
import { HttpService } from '../http.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService,
    private notif: NotificationService
  ) { }

  // States
  private receiptViewId = new Subject<any>();
  setReceiptViewId(status: any, id: number) {
    this.receiptViewId.next(
      {
        status: status,
        ReceiptId: id
      }
    )
  }
  getReceiptViewId() {
    return this.receiptViewId.asObservable();
  }

  /**
   * Adds new blank row to receiptItem
   * 2/21/22
   * @param data UserId, ReceiptId
   * @returns ReceiptItemId
   */
  addBlankReceiptItem(data: number | null): Observable<any> {
    let url = this.https.apiUrl + 'api/Receipt/AddBlankReceiptItem';
    let req = {
      UserId: this.app.getUserId(),
      ReceiptId: data
    };
    if (!data) {
      return of(false)
    };
    console.log("rs: ", req)
    return this.http.post(
      url,
      req
    ).pipe(
      map((data => {
        this.notif.sendReceiptItemNotif(true);
      })),
      catchError(this.app.processError)
    );
  }

  /**
   * Adds new receipt to db
   * 2/20/22
   * @param data TransactionId
   * @returns Notif to update trans
   */
  addNewReceipt(data: number): Observable<any> {
    let url = this.https.apiUrl + 'api/Receipt/AddNewReceipt';
    let req = {
      UserId: this.app.getUserId(),
      TransactionId: data
    }
    return this.http.post(
      url,
      req
    ).pipe(
      map((data => {
        this.notif.sendTransNotif(true);
      })),
      catchError(this.app.processError)
    );
  }

  /**
   * Gets list of transactions without receipts
   * 2/20/22
   * @returns Transaction No Receipt List
   */
  getTransWithoutReceipts(): Observable<any> {
    let url = this.https.apiUrl + 'api/Receipt/GetTransactionsWithoutReceipts';
    let req = { UserId: this.app.getUserId() };
    return this.http.post(
      url,
      req
    ).pipe(
      catchError(this.app.processError)
    );
  }

  /**
   * Gets list of receipts
   * 2/20/22
   * @returns Transaction Receipt List
   */
  getReceiptList(): Observable<any> {
    let url = this.https.apiUrl + 'api/Receipt/GetReceiptList';
    let req = { UserId: this.app.getUserId() }
    return this.http.post(
      url,
      req
    ).pipe(
      catchError(this.app.processError)
    );
  }

  /**
   * Gets Receipt data
   * 2/20/22
   * @param data UserId, ReceiptId
   * @returns ReceiptData 
   */
  getReceiptData(data: number) {
    let url = this.https.apiUrl + 'api/Receipt/GetReceiptData';
    let req = {
      UserId: this.app.getUserId(),
      ReceiptId: data
    }
    return this.http.post(
      url,
      req
    ).pipe(
      catchError(this.app.processError)
    );
  }

  /**
   * Gets ReceiptItem data
   * 2/20/22
   * @param data UserId, ReceiptId
   * @returns ReceiptItemData object
   */
  getReceiptItemData(data: number) {
    let url = this.https.apiUrl + 'api/Receipt/GetReceiptItemData';
    let req = {
      UserId: this.app.getUserId(),
      ReceiptId: data
    }
    return this.http.post(
      url,
      req
    ).pipe(
      catchError(this.app.processError)
    );
  }

  /**
 * Update ReceiptItem.Amount
 * @param data 
 * @returns ReceiptId
 */
   updateReceiptItemTitle(data: any): Observable<any> {
    let url = this.https.apiUrl + 'api/Receipt/UpdateReceiptItemTitle';
    let req = {
      UserId :this.app.getUserId(),
      ReceiptItemId : data.ReceiptItemId,
      UpdateValue : data.UpdateValue
    };
    return this.http.put(
      url,
      req
    ).pipe(
      catchError(this.app.processError)
    );
  }

  /**
 * Update ReceiptItem.Amount
 * @param data 
 * @returns 
 */
  updateReceiptItemAmount(data: any): Observable<any> {
    let url = this.https.apiUrl + 'api/Receipt/UpdateReceiptItemAmount';
    data.UserId = this.app.getUserId();
    return this.http.put(
      url,
      data
    ).pipe(
      map((data => {
        this.notif.sendReceiptItemNotif(true);
      })),
      catchError(this.app.processError)
    );
  }

  /**
   * Update ReceiptItem.Quantity
   * @param data 
   * @returns 
   */
  updateReceiptItemQuantity(data: any): Observable<any> {
    let url = this.https.apiUrl + 'api/Receipt/UpdateReceiptItemQuantity';
    data.UserId = this.app.getUserId();
    return this.http.put(
      url,
      data
    ).pipe(
      map((data => {
        this.notif.sendReceiptItemNotif(true);
      })),
      catchError(this.app.processError)
    );
  }

  /**
   * Disable rectipItem by id
   * @param data 
   * @returns ReceiptId
   */
  deleteReceiptItem(data: number): Observable<any> {
    console.log("Data: ", data)
    let url = this.https.apiUrl + 'api/Receipt/DeleteReceiptItem';
    let req = {
      UserId: this.app.getUserId(),
      ReceiptItemId: data
    }
    console.log(req)
    return this.http.put<any>(
      url,
      req
    ).pipe(
      map((data => {
        this.notif.sendReceiptItemNotif(true);
      })),
      catchError(this.app.processError)
    );
  }



}
