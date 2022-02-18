import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class TransactionService {
  private filterData!: TransactionFilter;

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService,
    private notif: NotificationService,
    private filter: FilterService
  ) {
    this.filter.getFilterData().subscribe(
      data => {
        this.filterData = data;
      }
    )
  }

  /**
   * Gets transaction data from db
   * @returns array of <Transaction>
   */
  getTransactionData(): Observable<any> {
    return this.http.post<TransactionDataRequest>(
      this.https.apiUrl + 'api/Transaction/GetTransactionDataFilter', this.filterData
    )
      .pipe(catchError(this.app.processError));
  }

  /**
   * Inserts transaction into db
   * @param transaction 
   * @returns inserted <Transaction>
   */
  submitTransaction(transaction: TransactionSubmission): Observable<any> {
    transaction.UserId = this.app.getUserId();
    transaction.LocationTitle = (transaction.LocationTitle) ? transaction.LocationTitle : "";
    transaction.CategoryId = (transaction.CategoryId) ? transaction.CategoryId : 1;
    transaction.SubcategoryId = (transaction.SubcategoryId) ? transaction.SubcategoryId : 1;
    return this.http.post<TransactionSubmission>(
      this.https.apiUrl + 'api/Transaction/CreateTransaction',
      transaction
    )
      .pipe(
        map((data => {
          this.notif.sendTransNotif(true);
        })),
        catchError(this.app.processError)
      );
  }

  /**
   * Updates transaction at transaction id
   * @param data 
   * @returns updated <Transaction>
   */
  updateTransaction(data: any): Observable<any> {
    let req = {
      UserId: this.app.getUserId(),
      TransactionId: data.transactionId,
      UpdateColumn: data.column,
      UpdateValue: data.value
    };
    return this.http.put<any>(
      this.https.apiUrl + 'api/Transaction/updateTransaction',
      req
    ).pipe(
      map((data => {
        setTimeout(() => {
          this.notif.sendTransNotif(true);
        }, 150);
        // this.notif.sendTransNotif(true);
      })),
      catchError(this.app.processError)
    );
  }

  /**
   * Disables transaction at transaction id (Does not delete)
   * Created: 1/1/22
   * @param data 
   * @returns disabled <Transaction>
   */
  disableTransaction(data: any): Observable<any> {
    let request = {
      UserId: this.app.getUserId(),
      TransactionId: data
    };
    return this.http.delete(
      this.https.apiUrl + 'api/Transaction/DisableTransaction',
      { body: request }
    ).pipe(
      map((data => {
        this.notif.sendTransNotif(true);
      })),
      catchError(this.app.processError)
    );
  }

  /**
   * Sets Transaction.Reconcile to TRUE at TransactionId
   * Created: 2/16/22
   * @param id TransactionId
   * @returns 
   */
  reconcileTransaction(id: number): Observable<any> {
    let req = {
      UserId: this.app.getUserId(),
      TransactionId: id
    };
    return this.http.put(
      this.https.apiUrl + 'api/Transaction/ReconcileTransaction',
      req
    ).pipe(
      map((data => {
        this.notif.sendTransNotif(true);
      })),
      catchError(this.app.processError)
    );
  }

  /**
   * Sets Transaction.Reconcile to FALSE at TransactionId
   * Created: 2/16/22
   * @param id TransactionId
   * @returns 
   */
  unreconcileTransaction(id: number): Observable<any> {
    let req = {
      UserId: this.app.getUserId(),
      TransactionId: id
    };
    return this.http.put(
      this.https.apiUrl + 'api/Transaction/UnreconcileTransaction',
      req
    ).pipe(
      map((data => {
        this.notif.sendTransNotif(true);
      })),
      catchError(this.app.processError)
    );
  }
}
