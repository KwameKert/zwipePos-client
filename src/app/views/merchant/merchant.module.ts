import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantRoutingModule } from './merchant-routing.module';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ListCategoryComponent } from 'src/app/modules/category/components/list-category/list-category.component';



@NgModule({
  declarations: [ListCategoryComponent],
  imports: [
    CommonModule, 
    DashboardModule,
    SharedModule,
    MerchantRoutingModule
  ]
})
export class MerchantModule { }
