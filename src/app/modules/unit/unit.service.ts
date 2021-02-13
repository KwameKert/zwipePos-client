import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/service';

export interface Unit {
  name: String, 
  stat: String,
  createdAt:  Date
}
@Injectable({
  providedIn: 'root'
})
export class UnitService extends CrudService<Unit> {

  private _url :String = environment.api_host;
  constructor(public _httpClient: HttpClient) { 
    super(_httpClient, "category")
  }
}
