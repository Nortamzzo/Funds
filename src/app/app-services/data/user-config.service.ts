import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppService } from '../app.service';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService,
  ) { }

  private url: string = this.https.apiUrl + 'api/';

  
}
