import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '../app-models/response.model';
import { TableInfo } from '../app-models/tables.model';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  tableData: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get table data for selected table
   * @param tableName Table name query
   * @return columnData[]
   */
  getTableData(tableName: string): Observable<TableInfo> {
    const url = `${environment.apiUrl}/api/Config/GetTableData?tableName=${tableName}`;

    return this.http
      .get(url)
      .pipe(map((response: Response<any>) => response.result))
  }

}