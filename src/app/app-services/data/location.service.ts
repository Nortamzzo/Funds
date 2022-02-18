import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from '../app.service';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService
  ) { }

  getLocationData() {
    let UserId = this.app.getUserId();
    return this.http.post(
      this.https.apiUrl + 'api/Location/GetLocationData', 
      { 
        UserId : UserId 
      })
    .pipe(
      catchError(this.app.processError)
    )
  };

  getLocationList(): Observable<any> {
    let UserId = this.app.getUserId();
    return this.http.post(
      this.https.apiUrl + 'api/Location/GetLocationList', 
      { 
        UserId : UserId 
      })
    .pipe(
      catchError(this.app.processError)
    )
  };

  searchLocations(loc: string): Observable<string[]> {
    let UserId = this.app.getUserId();
    return this.http.post<any[]>(
      this.https.apiUrl + 'api/Location/SearchLocations', 
      { 
        UserId : UserId, 
        Term : loc 
      })
    .pipe(
      map( kv => kv.map( k => k.Title) )
    )
  }
}
