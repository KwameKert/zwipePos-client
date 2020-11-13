import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from 'src/app/modules/category/components/add-category/add-category.component';
import { MerchantComponent } from 'src/app/modules/dashboard/components/merchant/merchant.component';
import { ListCategoryComponent } from 'src/app/modules/category/components/list-category/list-category.component';
import { ListProductComponent } from 'src/app/modules/product/component/list-product/list-product.component';
import { ShopingCartComponent } from 'src/app/modules/cash-register/components/shoping-cart/shoping-cart.component';


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
  },
  {
    path: 'product',
    component: ListProductComponent,
    data: {
      title: 'merchant',
      breadcrumb: [
        {
          label: 'home',
          url: '/merchant/dashboard'
        },
        {
          label: 'product',
          url: ''
        }
      ]
    },
  },
  {
    path: 'cash-register',
    component: ShopingCartComponent,
    data: {
      title: 'cash-register',
      breadcrumb: [
        {
          label: 'home',
          url: '/merchant/dashboard'
        },
        {
          label: 'cash-register',
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
