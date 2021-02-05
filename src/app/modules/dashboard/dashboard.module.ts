import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantComponent } from './components/merchant/merchant.component';
import { SharedModule } from '../shared/shared.module';
import { SalesPersonComponent } from './components/sales-person/sales-person.component';



@NgModule({
  declarations: [MerchantComponent, SalesPersonComponent],
  imports: [
    CommonModule, 
    SharedModule
  ]
})
export class DashboardModule { }
