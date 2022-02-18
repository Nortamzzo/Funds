import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { APP_ID, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private urlD: string = 'http://localhost:5000/';
  private urlP: string = 'http://192.168.1.10:5000/';
  public apiUrl: string = this.urlD;

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  public get<T>(url: string): Observable<T> {
    const endpoint = `${this.baseUrl}/${url}`;
    return this.http.get<T>(endpoint);
  }

  public post<T>(url: string, body: T): Observable<void> {
    const endpoint = `${this.baseUrl}/${url}`;
    let headers = new Headers();
    return this.http.post<void>(endpoint, body, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }} );
  }

  public put<T>(url: string, body: T): Observable<void> {
    const endpoint = `${this.baseUrl}/${url}`;
    return this.http.put<void>(endpoint, body, { headers: { 'Content-Type': 'application/json' }} );
  }

  public delete<T>(url: string, body: T): Observable<void> {
    console.log(body)
    const endpoint = `${this.baseUrl}/${url}`;
    return this.http.delete<void>(endpoint, { body: body} );
  }
}