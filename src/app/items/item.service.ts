import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemData, ItemList } from '@app/app-models/item-models';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TransactionDataRequest, TransactionFilter, TransactionSubmission } from 'src/app/app-models/transaction-models';
import { AppService } from '../app-services/app.service';
import { FilterService } from '../app-services/filter.service';
import { HttpService } from '../app-services/http.service';
import { NotificationService } from '../app-services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService,
    private notif: NotificationService
  ) { }


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

  searchItems(item: string): Observable<string[]> {
    let UserId = this.app.getUserId();
    let url = this.https.apiUrl + 'api/Item/SearchItems';
    let req = {
      UserId: UserId,
      Term: item
    }
    return this.http.post<any[]>(
      url,
      req
    ).pipe(
      map(keyValue => keyValue.map(key => key.ItemTitle)
      )
    )
  }

  opts: any = [];
  getItemList(): Observable<any[]> {
    let url = this.https.apiUrl + 'api/Item/GetItemList';
    let params = new HttpParams()
      .set("UserId", this.app.getUserId())
    return this.http.get<ItemList[]>(url, { params })
      .pipe(
        map(keyValue => keyValue.map(key => key.ItemTitle)
        )
      )
  }

  addNewItemFromReceipt(itemFromReceipt: any): Observable<any> {
    let url = this.https.apiUrl + 'api/Item/AddItemFromRec';
    itemFromReceipt.UserId = this.app.getUserId();
    return this.http.post<any>(
      url,
      itemFromReceipt
    ).pipe(
      map((data => {
        this.notif.sendAddReceiptItemSubNotif(
          true, itemFromReceipt.ReceiptId
        )
      })),
      catchError(this.app.processError)
    );
  }

  /**
   * Adds new item to db
   * @param title New item title
   * @param info New item information
   * @returns ItemData for new item id
   */
  addNewItem(data: any): Observable<any> {
    let url = this.https.apiUrl + 'api/Item/AddNewItem';
    let req = {
      UserId: this.app.getUserId(),
      ItemTitle: data.Title,
      Information: data.Information
    };
    console.log(req)
    return this.http.post<any>(
      url,
      req
    ).pipe(
      catchError(this.app.processError)
    );
  }

  /**
   * Gets item data from db
   * @returns Item[]
   */
  getItemData() {
    let url = this.https.apiUrl + 'api/Item/GetItemData';
    let req = {
      UserId: this.app.getUserId(),
    };
    return this.http.post(
      url,
      req
    ).pipe(
      catchError(this.app.processError)
    );
  }

}
