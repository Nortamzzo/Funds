import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from '../app.service';
import { HttpService } from '../http.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService,
    private notif: NotificationService
  ) { }

  /**
   * Sets selected sidebar view to UserConfig
   * Created: 2/17/22
   * @param data UserId, Selection
   */
  setSidebarSelection(data: string): Observable<any> {
    let req = {
      UserId: this.app.getUserId(),
      Selection: data
    }
    return this.http.put(
      this.https.apiUrl + 'api/Config/SetSidebarSelection',
      req
    ).pipe(
      map((
        data => {
          this.notif.sendUserConfigNotif(true);
        })),
      catchError(
        this.app.processError
      )
    );
  }

  /**
   * Gets UserConfig Data
   * Created: 2/17/22
   * @returns UserConfig Array
   */
  getUserConfigData():Observable<any> {
    return this.http.post(
      this.https.apiUrl + 'api/Config/GetUserConfigData',
      {
        UserId : this.app.getUserId()
      }
    ).pipe(
      catchError(
        this.app.processError
      )
    );
  }
}
