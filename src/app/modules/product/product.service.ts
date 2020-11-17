import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/service';

export interface Product {
  id: number,
  name: String, 
  quantity: number, 
  sellingPrice : number, 
  costPrice : number, 
  status: String , 
  description: String, 
  shopId: String, 
  categoryId: number,
  categoryName: String, 
  createdAt: Date, 
  updatedAt: Date,
  size: number , 
  weight: number,
  color: String,
  minQuantity: number,
}

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<any> {

  private _url :String = environment.api_host;
  constructor(public _httpClient: HttpClient) { 
    super(_httpClient, "product")
  }

  fetchShopProducts(id: Number){
    return this._httpClient.get<ApiResponse<Product[]>>(`${this._url}/product/shop/${id}`).toPromise();
  }

}
