import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin, AdminLogin, AdminTopics } from '@app/app-models/admin.models';
import { AppService } from '@app/app-services/app.service';
import { HttpService } from '@app/app-services/http.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public admin = new BehaviorSubject<Admin | null>(null);

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private router: Router,
    private app: AppService
  ) { }

  /**
   * calls authenticator with login info (data)
   * @param data 
   */
  login(data: AdminLogin) {
    let url = this.https.apiUrl + 'api/Admin/LoginAdmin';
    let req = {
      AdminName: data.AdminName,
      AdminPassword: data.AdminPassword
    };
    console.log("Step 1: ", data.AdminName)
    return this.http.post<any>(url, req)
      .pipe(
        catchError(this.handleError),
        tap(data => {
          console.log('Step 2')
          this.handleAuthentication(data)
        })
      );
  }

  private handleAuthentication<Admin>(data: AdminLogin) {
    console.log("Log")
    const admin = new Admin(
      data.AdminName
    );
    this.admin.next(admin);
    this.router.navigate(['control']);
  }

  register(data: AdminLogin) {
    this.handleRegister(data).subscribe();
  }


  /**
  * add user to database
  * @param data 
  */
  handleRegister(data: AdminLogin): Observable<any> {
    console.log(data)
    let url = this.https.apiUrl + 'api/Admin/CreateNewAdmin';
    let req = {
      AdminName: data.AdminName,
      AdminPassword: data.AdminPassword
    };
    return this.http.post(url, req)
      .pipe(catchError(this.handleError));
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

  getAdminTopics(): Observable<any> {
    let url = this.https.apiUrl + 'api/Admin/GetAdminTopics';
    // implement security check 
    // let params = new HttpParams()
    //   .set("AdminName", this.admin.value.AdminName)
    return this.http.get<AdminTopics>(url)
    .pipe(
      catchError(this.app.processError)
    )
  }

  getNavbarTopics(): Observable<any> {
    let url = this.https.apiUrl + 'api/Admin/GetNavbarTopics';
    // implement security check 
    // let params = new HttpParams()
    //   .set("AdminName", this.admin.value.AdminName)
    return this.http.get<AdminTopics>(url)
    .pipe(
      catchError(this.app.processError)
    )
  }

  getNavbarLinks(): Observable<any> {
    let url = this.https.apiUrl + 'api/Admin/GetNavbarLinks';
    // implement security check 
    // let params = new HttpParams()
    //   .set("AdminName", this.admin.value.AdminName)
    return this.http.get<AdminTopics>(url)
    .pipe(
      catchError(this.app.processError)
    )
  }
}
