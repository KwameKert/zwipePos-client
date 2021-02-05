import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContributionsService {

  private _url :String = environment.api_host;
  constructor(public _httpClient: HttpClient) { 
  
  }

  computeTithe(data: any){
    return this._httpClient.post<ApiResponse<any>>(`${this._url}/transaction/tithe`, data).toPromise();
  }

  computeCommission(data: any){
    return this._httpClient.post<ApiResponse<any>>(`${this._url}/transaction/commission`, data).toPromise();
  }

}
