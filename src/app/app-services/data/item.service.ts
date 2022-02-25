import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemData, ItemList } from '@app/app-models/item-models';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TransactionDataRequest, TransactionFilter, TransactionSubmission } from 'src/app/app-models/transaction-models';
import { AppService } from '../app.service';
import { FilterService } from '../filter.service';
import { HttpService } from '../http.service';
import { NotificationService } from '../notification.service';

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
    let req = { UserId: this.app.getUserId() };
    return this.http.post<ItemList[]>(
      url,
      req
    ).pipe(
      map(keyValue => keyValue.map(key => key.ItemTitle)
      )
    )
  }

  addNewItemFromReceipt(request: any): Observable<any> {
    let url = this.https.apiUrl + 'api/Item/AddItemFromRec';
    request.UserId = this.app.getUserId();
    console.log(request)
    return this.http.post<any>(
      url,
      request
    ).pipe(
      map((data => {
        this.notif.sendAddReceiptItemSubNotif(
            true, request.ReceiptId
          )})),
      catchError(this.app.processError)
    );
  }

}