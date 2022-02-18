import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategoryDataRequest } from 'src/app/app-models/category-models';
import { AppService } from '../app.service';
import { HttpService } from '../http.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService,
    private notif: NotificationService
  ) { }

  /**
   * 
   * @param request 
   * @returns 
   */
  getCategoryData(request?: any): Observable<any> {
    let UserId = this.app.getUserId();
    return this.http.post<CategoryDataRequest>(
      this.https.apiUrl + 'api/Category/GetCategoryData',
      {
        UserId: UserId,
        CategoryId: (request) ? request : null
      })
      .pipe(catchError(this.app.processError));
  }

  /**
   * 
   * @param request 
   * @returns 
   */
  getCategoryBudgetFull(request?: any): Observable<any> {
    let req = {
      UserId : this.app.getUserId(),
      YearOf : request
    }
    return this.http.post<CategoryDataRequest>(
      this.https.apiUrl + 'api/Category/GetCategoryBudgetDataFull',
      req
      )
      .pipe(catchError(this.app.processError));
  }

  /**
   * 
   * @param category 
   * @returns 
   */
  submitCategory(category: any): Observable<any> {
    category.UserId = this.app.getUserId();
    console.log(category)
    return this.http.post<any>(
      this.https.apiUrl + 'api/category/CreateNewCategory',
      category)
      .pipe(
        map((data => {
          this.notif.sendCategoryNotif(true);
        })),
        catchError(this.app.processError)
      );
  }
}
