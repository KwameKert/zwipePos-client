import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private _baseUrl :String = environment.api_host;
 
  constructor( public _httpClient: HttpClient) { }
  
  public delete(id: string, module: string){
    return this._httpClient.delete<ApiResponse<any>>(`${this._baseUrl}/${module}/${id}`).toPromise();
   }

}
