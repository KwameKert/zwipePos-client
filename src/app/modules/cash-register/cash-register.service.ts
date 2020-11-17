import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/service';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService extends CrudService<any>{

  private _url :String = environment.api_host;
  constructor(public _httpClient: HttpClient) { 
    super(_httpClient, "transaction")
  }

  fetchTransactions(id: Number){
    return this._httpClient.get<ApiResponse<any>>(`${this._url}/transaction/shop/${id}`).toPromise();
  }

}
