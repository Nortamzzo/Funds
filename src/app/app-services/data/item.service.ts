import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemData } from '@app/app-models/item-models';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    return this.http.post<any[]>(
      this.https.apiUrl + 'api/Item/SearchItems',
      {
        UserId: UserId,
        Term: item
      })
      .pipe(
        map(keyValue => keyValue.map(key => key.ItemTitle))
      )
  }

  getItemList(): Observable<string[]> {
    let url = this.https.apiUrl + 'api/Item/GetItemList';
    let req = { UserId: this.app.getUserId() };
    return this.http.post<string[]>(
      url,
      req
    ).pipe(
      catchError(this.app.processError)
    );
  }

}
