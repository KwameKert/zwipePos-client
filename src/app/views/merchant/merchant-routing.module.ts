import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from 'src/app/modules/category/components/add-category/add-category.component';
import { MerchantComponent } from 'src/app/modules/dashboard/components/merchant/merchant.component';


const routes: Routes = [

  {
    path: 'dashboard',
    component: MerchantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class MerchantRoutingModule { }
