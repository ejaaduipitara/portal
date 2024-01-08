// your-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private authToken = environment.authToken;
  private apiUrl = environment.host

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`,
    });

    const requestData = { request: {} };
    return this.http.post(this.apiUrl + '/metrics', requestData, { headers });
  }

  getDashboardToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`,
    })
    const requestData = {
      request: {
        dashboardIds: [
          ...environment.dashboardIds
        ]
      }
    }

    return this.http.post(this.apiUrl + '/dashboard/token', requestData, { headers });
  }
}
