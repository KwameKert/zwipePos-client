import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRepRouting } from './sales-rep-routing.module';
import { ProductModule } from 'src/app/modules/product/product.module';
import { CashRegisterModule } from 'src/app/modules/cash-register/cash-register.module';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SalesRepRouting,
    ProductModule,
    CashRegisterModule,
    DashboardModule
  ]
})
export class SalesRepModule { }
