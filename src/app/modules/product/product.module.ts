import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ListProductComponent } from './component/list-product/list-product.component';
import { ViewProductComponent } from './component/view-product/view-product.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AddProductComponent, ListProductComponent, ViewProductComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListProductComponent
  ]
})
export class ProductModule { }
