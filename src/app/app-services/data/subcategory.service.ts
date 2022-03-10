import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SubcategoryDataRequest } from 'src/app/app-models/subcategory-models';
import { AppService } from '../app.service';
import { HttpService } from '../http.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private CategoryId: number = 0;

  constructor(
    private http: HttpClient,
    private https: HttpService,
    private app: AppService,
    private notif: NotificationService
  ) {
    this.notif.getCategoryId().subscribe(
      data => {
        this.CategoryId = data;
      }
    )
  }

  setCategoryId(data: number) {
    this.CategoryId = data;
  }

  /**
   * Gets subcateogry data for category id
   * @param request: UserId, CategoryId
   * @returns 
   */
  getSubcategoryData(request?: any): Observable<any> {
    let UserId = this.app.getUserId();
    let CategoryId = this.CategoryId;

    return this.http.post<SubcategoryDataRequest>(
      this.https.apiUrl + 'api/Subcategory/GetSubcategoryData',
      {
        UserId: UserId,
        CategoryId: CategoryId
      })
      .pipe(catchError(this.app.processError));
  }

  /**
   * Gets subcategory data for cateogry
   * @param request UserId, Categoryid
   * @returns subcategory object
   */
  getSubcategoryDataByCatId(request?: any): Observable<any> {
    let req = {
      UserId : this.app.getUserId(),
      CategoryId : request ? request : this.CategoryId
    }
    return this.http.post<SubcategoryDataRequest>(
      this.https.apiUrl + 'api/Subcategory/GetSubcategoryDataById',
      req
      )
      .pipe(catchError(this.app.processError));
  }





  
  /**
   * Add new subcategory to user
   * @param subcategory 
   * @returns bool
   */
  submitSubcategory(subcategory: any): Observable<any> {
    let UserId = this.app.getUserId();
    subcategory.UserId = UserId;
    return this.http.post<any>(
      this.https.apiUrl + 'api/Subcategory/CreateNewSubcategory',
      subcategory
      )
      .pipe(
        map((data => {
          this.notif.sendSubcategoryNotif(true);
        })),
        catchError(this.app.processError)
      );
  }

  /**
   * Updates budget for selected subcategory
   * @param request SubcategoryId, Updatevalue
   * @returns 
   */
  updateSubcategoryBudget(request: any): Observable<any> {
    request.UserId = this.app.getUserId();
    return this.http.put<any>(
      this.https.apiUrl + 'api/Subcategory/UpdateSubcategoryBudget',
      request
    )
    .pipe(
      map((data => {
        this.notif.sendCategoryNotif(true);
        this.notif.sendSubcategoryNotif(true);
      })),
      catchError(this.app.processError)
    );
  }

  /**
   * Gets 12 months of spending in subcategory, variable year
   * @param year 
   * @returns 
   */
  getBudgetDataFull(year: number): Observable<any> {
    let request = {
      UserId : this.app.getUserId(),
      YearOf : year
    };
    return this.http.post(
      this.https.apiUrl + 'api/Subcategory/GetBudgetDataFull',
      request
    )
    .pipe(catchError(this.app.processError));
  }
}
