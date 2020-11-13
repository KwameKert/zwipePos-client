import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/service';

export interface Product {
  id: Number,
  name: String, 
  quantity: Number, 
  amount : Number, 
  status: String , 
  description: String, 
  shopId: String, 
  categoryId: number,
  categoryName: String, 
  createdAt: Date, 
  updatedAt: Date,
  size: Number , 
  weight: Number,
  color: String,
  minQuantity: Number,
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
