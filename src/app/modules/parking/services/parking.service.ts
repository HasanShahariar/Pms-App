import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {


  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  createParkingEntry(entry: any): Observable<any> {
    return this.http.post(this.apiUrl+"Parking/Create", entry);
  }



  getParkingRecords(date?: Date): Observable<any> {
    let params = new HttpParams();

    if (date) {
      params = params.set('date', date.toISOString());  // Convert date to ISO string format
    }

    return this.http.get<any>(this.apiUrl+"Parking/GetAll", { params });
  }

  updateParkingEntry(id: number, entry: any): Observable<any> {
    return this.http.put(`${this.apiUrl}Parking/update/${id}`, entry);
  }

 

  getParkingByInfoId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Parking/GetParkingInfoById?id=${id}`);
  }

}
