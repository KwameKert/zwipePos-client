import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantComponent } from './components/merchant/merchant.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [MerchantComponent],
  imports: [
    CommonModule, 
    SharedModule
  ]
})
export class DashboardModule { }
