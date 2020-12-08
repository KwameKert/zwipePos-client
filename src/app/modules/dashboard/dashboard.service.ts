import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _baseUrl :String = environment.api_host;
  
  constructor(   private _httpClient: HttpClient) { }

  fetchDashboard(id: Number){
    return this._httpClient.get<ApiResponse<any>>(`${this._baseUrl}/user/dashboard/shop/${id}`).toPromise();
  }
}
