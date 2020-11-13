import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantRoutingModule } from './merchant-routing.module';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ListCategoryComponent } from 'src/app/modules/category/components/list-category/list-category.component';
import { CategoryModule } from 'src/app/modules/category/category.module';
import { ProductModule } from 'src/app/modules/product/product.module';
import { CashRegisterModule } from 'src/app/modules/cash-register/cash-register.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    CategoryModule,
    DashboardModule,
    ProductModule,
    CashRegisterModule,
    SharedModule,
    MerchantRoutingModule
  ]
})
export class MerchantModule { }
