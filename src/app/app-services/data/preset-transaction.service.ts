import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PresetCreate, PresetSubmit } from 'src/app/app-models/preset-transaction-model';
import { AppService } from '../app.service';
import { HttpService } from '../http.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class PresetTransactionService {

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService,
    private notif: NotificationService
  ) { }

  getPresetTransactionData(): Observable<any> {
    let UserId = this.app.getUserId();
    return this.http.post(
      this.https.apiUrl + 'api/PresetTransaction/GetPresetData', { UserId: UserId })
      .pipe(catchError(this.app.processError))
  }

  createPresetTransaction(data: PresetCreate): Observable<any> {
    let UserId = this.app.getUserId();
    data.UserId = UserId;
    return this.http.post(
      this.https.apiUrl + 'api/PresetTransaction/CreatePresetTransaction', data)
      .pipe(
        map((data => {
          this.notif.sendPresetNotif(true);
        })),
        catchError(this.app.processError)
      );
  }
  private cache: any;
  submitPresetTransaction(data: PresetSubmit): Observable<any> {
    let UserId = this.app.getUserId();
    data.UserId = UserId;
    if (this.cache) {
      return of(this.cache);
    }
    return this.http.post(
      this.https.apiUrl + 'api/PresetTransaction/SubmitPresetTransaction', data)
      .pipe(
        map((data => {
          this.notif.sendTransNotif(true);
        })),
        catchError(this.app.processError)
      );
  }
}
