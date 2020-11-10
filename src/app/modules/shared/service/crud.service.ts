import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment} from '../../../../environments/environment';
import { ApiResponse } from 'src/app/models/ApiResponse';



export class CrudService<T> {

  private _baseUrl :String = environment.api_host;
  constructor(public _httpClient: HttpClient, public model: string) { }


  deleteItem(id: string, module: string){
    return this._httpClient.delete<ApiResponse<any>>(`${this._baseUrl}/${module}/${id}`).toPromise();
   }


   query(filter: any) {
    return this._httpClient.get<ApiResponse<T[]>>(`${this._baseUrl}/${this.model}/query?${this.getQueryString(filter)}`).toPromise()
}

   
  public fetchItem(id: string){
    return this._httpClient.get<ApiResponse<T>>(`${this._baseUrl}/${this.model}/${id}`).toPromise();
  }


  public fetchAll() {
    return this._httpClient.get<ApiResponse<T[]>>(`${this._baseUrl}/${this.model}/`).toPromise();
  }

  public addItem(data: T){
    return this._httpClient.post<ApiResponse<T>>(`${this._baseUrl}/${this.model}/`, data).toPromise();
  }


  public updateItem(data: T){
    return this._httpClient.patch<ApiResponse<T>>(`${this._baseUrl}/${this.model}`, data).toPromise();
  }

  protected getQueryString(filter: object) {
    let queryString = Object.keys(filter).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key])
    }).join('&');

    return queryString
}



}
