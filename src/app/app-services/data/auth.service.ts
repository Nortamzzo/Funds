import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../http.service';

import { User } from '../../app-models/user.models';
import { LoginData, SignupData, UserData } from '../../app-models/auth.models';
import { ConfigService } from '@app/app-config/config.service';
import { NotificationService } from '@app/app-services/notification.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<User | null>(null);
  public loggedIn = new BehaviorSubject<boolean>(false);
  private tokenExpirationTimer: any;
  private api: string = '';

  constructor(
    private httpc: HttpClient,
    private https: HttpService,
    private router: Router
  ) {
   
   }

  private hasUserData(): boolean {
    return !!sessionStorage.getItem('userData');
  }

  /**
  * add user to database
  * @param data 
  */
  register(data: SignupData): Observable<any> {
    return this.httpc.post(
      this.https.apiUrl + 'api/Auth/Signup', 
      {
        Email: data.Email,
        Password: data.Password,
        FirstName: data.FirstName,
        LastName: data.LastName
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * calls authenticator with login info (data)
   * @param data 
   */
  login(data: LoginData) {
    this.authenticateUser(data).subscribe(
      data => {
        if (!data[0]) {
          return;
        } else {
          this.handleAuthentication(data[0]);
          this.router.navigate(['funds']);
        }
      }
    );
  }

  /**
   * post loginData to webapi
   * verify credentials
   * @param data 
   * @returns 
   */
  authenticateUser(data: LoginData): Observable<any> {
    return this.httpc.post(
      this.https.apiUrl + 'api/Auth/Login',
      {
        Email: data.Email,
        Password: data.Password
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * initiate new user
   * add user details to session storage
   * @param data 
   */
  private handleAuthentication<User>(data: UserData) {
    const user = new User(
      data.UserId,
      data.Email,
      data.FirstName,
      data.LastName,
      data.Created
    );
    this.user.next(user);
    this.loggedIn.next(true);
    sessionStorage.setItem(
      'userData',
      JSON.stringify(user));
    sessionStorage.setItem(
      'history',
      this.router.url
    );
  }

  /**
   * reads session storage for user info
   * if it exists logs user in without having to do authenticate()
   * @returns 
   */
  autoLogin() {
    const autoData: {
      UserId: number,
      Email: string,
      FirstName: string,
      LastName: string,
      Created: Date
    } = JSON.parse(
      sessionStorage.getItem('userData') as string
    );
    if (!autoData) {
      return;
    }
    const autoUser = new User(
      autoData.UserId,
      autoData.Email,
      autoData.FirstName,
      autoData.LastName,
      autoData.Created
    )
    // this.router.navigate(['/application/main']);
    // if (autoUser.token) {
    //   this.user.next(autoUser);
    //   this.isLoginSubject.next(true);
    //   this.router.navigate(['/application/main']);
    //   sessionStorage.setItem('history', this.router.url);
    //   const expirationDuration = new Date(autoData._expirationDate).getTime() - new Date().getTime();
    //   this.autoLogout(expirationDuration);
    // }
  }

  /**
   * calls logout() after set amount of time
   * @param expirationDuration 
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  /**
   * logs out user
   * removes session storage
   * navigates to login screen
   */
  logout() {
    this.user.next(null);
    this.loggedIn.next(false);
    sessionStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['']);
    // TODO: add loading spinner for 1.5 seconds during logout,
    //       then route to login page / landing page
    // setTimeout(
    //   () => this.router.navigate(['/login']), 1500);
  }

  /**
   * Process errors into readable info
   * @param errorRes 
   * @returns error info
   */
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
