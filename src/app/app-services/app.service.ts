import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthService } from './data/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  serverWin: string = 'https:localhost:5001/';
  serverLin: string = 'http://192.168.1.10:5000/';
  serverSet: string = 'Lin';
  server: string = (this.serverSet = 'Win') ? this.serverWin : this.serverLin;

  constructor(
    private auth: AuthService
  ) { }

  getUserInfo(): Observable<any> {
    return JSON.parse(sessionStorage.getItem('userData') as string);
  }

  getUserId() {
    let obj = JSON.parse(sessionStorage.getItem('userData') as string);
    if (obj === null) {
      return false;
    }
    return obj.UserId;
  }

  isLoggedIn(): Observable<boolean> {
    if (sessionStorage.getItem('userData')) {
      return of(true);
    } else {
      return of(false);
    }
    // return (sessionStorage.getItem('userInfo') != null) ? true : false;
  }

  logout() {
    this.auth.logout();
  }

  processError(err: any) {
    let msg = '';
    if (err.error instanceof ErrorEvent) {
      msg = err.error.message;
    } else {
      msg = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
