import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { SharedModule } from '../shared/shared.module';
import { AddItemComponent } from './components/add-item/add-item.component';



@NgModule({
  declarations: [ShopingCartComponent, AddItemComponent],
  imports: [
    CommonModule, 
    SharedModule
  ]
})
export class CashRegisterModule { }
