import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<any>{
  private _url :String = environment.api_host;
  constructor(public _httpClient: HttpClient) { 
    super(_httpClient, "product")
  }

  fetchShopProducts(id: Number){
    return this._httpClient.get<ApiResponse<any>>(`${this._url}/product/shop/${id}`).toPromise();
  }

  fetchUsers(id: Number){
    return this._httpClient.get<ApiResponse<any>>(`${this._url}/user/shop/${id}`).toPromise();
  }
}
