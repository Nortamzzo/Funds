import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Transaction, TransactionDataRequest, TransactionFilter } from './app-models/transaction-models';
import { AppService } from './app-services/app.service';
import { FilterService } from './app-services/filter.service';
import { HttpService } from './app-services/http.service';
import { ITransaction } from './shared/transaction.class';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private filterData: TransactionFilter;

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService,
    private filter: FilterService
  ) {
    this.filter.getFilterData().subscribe(
      data => {
        this.filterData = data;
      }
    )
  }

  getTransactionData(): Observable<Transaction> {
    return this.http.post<Transaction>(
      this.https.apiUrl + 'api/Transaction/GetTransactionDataFilter',
      this.filterData
    ).pipe(
      catchError(this.app.processError)
    );
  }

}
