import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantRoutingModule } from './merchant-routing.module';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    DashboardModule,
    MerchantRoutingModule
  ]
})
export class MerchantModule { }
