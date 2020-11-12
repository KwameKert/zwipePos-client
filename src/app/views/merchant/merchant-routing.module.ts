import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from 'src/app/modules/category/components/add-category/add-category.component';
import { MerchantComponent } from 'src/app/modules/dashboard/components/merchant/merchant.component';
import { ListCategoryComponent } from 'src/app/modules/category/components/list-category/list-category.component';


const routes: Routes = [

  {
    path: 'dashboard',
    component: MerchantComponent
  },
  {
    path: 'category',
    component: ListCategoryComponent,
    data: {
      title: 'merchant',
      breadcrumb: [
        {
          label: 'home',
          url: '/merchant/dashboard'
        },
        {
          label: 'category',
          url: ''
        }
      ]
    },
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class MerchantRoutingModule { }
