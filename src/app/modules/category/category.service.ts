import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/service';

export interface Category{

  name: String, 
  description: String, 
  status: String,
  id: Number,
  createdAt: Date, 
  updatedAt: Date

}

@Injectable({
  providedIn: 'root'
})
export class CategoryService  extends CrudService<Category>{

  private _url :String = environment.api_host;
  constructor(public _httpClient: HttpClient) { 
    super(_httpClient, "category")
  }

  fetchCategories(id: Number){
    return this._httpClient.get<ApiResponse<Category[]>>(`${this._url}/category/shop/${id}`).toPromise();
  }

  fetchUnits(){
    return this._httpClient.get<ApiResponse<Category[]>>(`${this._url}/unit/`).toPromise();
  }

}
