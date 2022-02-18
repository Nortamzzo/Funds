import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@app/app-config/config.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account, AccountDataRequest } from '../../app-models/account-models';
import { AppService } from '../app.service';
import { HttpService } from '../http.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private api: string = '';

  constructor(
    private httpc: HttpClient,
    private https: HttpService,
    private app: AppService,
    private notif: NotificationService,
    private config: ConfigService
  ) {
    this.config.getApiUrl().subscribe(
      data => {
        this.api = data;
      }
    )
   }

  getAccountData(data?: number): Observable<any> {
    let UserId = this.app.getUserId();
    let AccountId = (data) ? data : 0;
    return this.httpc.post<AccountDataRequest>(
      this.https.apiUrl + 'api/Account/GetAccountData',
      {
        UserId: UserId,
        AccountId: AccountId
      })
      .pipe(
        catchError(this.app.processError));
  }

  getBalances(): Observable<any> {
    let UserId = this.app.getUserId();
    return this.httpc.post<any[]>(
      this.https.apiUrl + 'api/Location/SearchLocations', 
      { 
        UserId: UserId, 
        AccountId: 0 
      })
      .pipe(
        map(kv => kv.map(k => k.Balance))
      )
  }


  getAccountTypeData(): Observable<any> {
    return this.httpc.get<any>(
      this.https.apiUrl + 'api/Account/GetAccountTypes'
    )
      .pipe(catchError(this.app.processError));
  }


  submitAccount(account: any): Observable<any> {
    let UserId = this.app.getUserId();
    account.UserId = UserId;
    return this.httpc.post<Account>(
      this.https.apiUrl + 'api/Account/CreateAccount',
      account
      )
      .pipe(
        map((data => {
          this.notif.sendAccountNotif(true);
        })),
        catchError(this.app.processError)
      );
  }
}
