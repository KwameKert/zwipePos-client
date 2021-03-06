import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { SharedModule } from '../shared/shared.module';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';
import { ViewReceiptComponent } from './components/view-receipt/view-receipt.component';



@NgModule({
  declarations: [ShopingCartComponent, AddItemComponent, ReceiptComponent, ReceiptListComponent, ViewReceiptComponent],
  imports: [
    CommonModule, 
    SharedModule
  ],
  exports:[ReceiptListComponent,  ReceiptComponent, AddItemComponent]
})
export class CashRegisterModule { }
