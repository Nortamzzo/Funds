import { HttpClient, HttpParams } from '@angular/common/http';
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
   * Gets UserConfig Data
   * Created: 2/17/22
   * @returns UserConfig Array
   */
  getUserConfigData(): Observable<any> {
    let url = this.https.apiUrl + 'api/Config/GetUserConfigData';
    let params = new HttpParams()
      .set("UserId", this.app.getUserId())
    return this.http.get(url, { params })
      .pipe(
        catchError(this.app.processError)
      );
  };

  /**
   * Get sidebar view data from db
   * @returns Object with user sidebar view data
   * TODO: types
   */
  public getUserConfigSidebarViews(): Observable<any> {
    let api = this.https.apiUrl + 'api/Config/GetSidebarViews';
    let params = new HttpParams()
      .set("UserId", this.app.getUserId())
    return this.http.get<any[]>(api, { params })
      .pipe(
        catchError(this.app.processError)
      )
  };

  /**
   * Sets selected sidebar view to UserConfig
   * Created: 2/17/22
   * @param data UserId, Selection
   */
  setSidebarSelection(data: string): Observable<any> {
    let url = this.https.apiUrl + 'api/Config/SetSidebarSelection';
    let req = {
      UserId: this.app.getUserId(),
      Selection: data
    };
    return this.http.put(url, req)
      .pipe(
        map((data => {
          this.notif.sendUserConfigNotif(true);
        })),
        catchError(
          this.app.processError
        )
      );
  };
}
