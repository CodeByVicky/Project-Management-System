import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseApiUrl : string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }


  getProjectCounts(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/api/Dashboard/projectCounts`);
  }

  getClosureDelayCount(): Observable<number> {
    return this.http.get<number>(`${this.baseApiUrl}/api/Dashboard/closureDelayCount`);
  }

  getDepartmentWiseSuccessData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/api/Dashboard/department`);
  }
}
