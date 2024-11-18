import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getDashboardData(date?: any): Observable<any> {
    let params = new HttpParams();

    if (date) {
      params = params.set('date', date);  // Convert date to ISO string format
    }
    return this.http.get(`${this.apiUrl}Parking/GetDashboardData`, { params });
  }
  getLineChartData(): Observable<any> {
    return this.http.get(`${this.apiUrl}Parking/GetLineChartData`);
  }



}
