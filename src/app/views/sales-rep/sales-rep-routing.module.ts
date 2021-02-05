import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopingCartComponent } from 'src/app/modules/cash-register/components/shoping-cart/shoping-cart.component';
import { SalesPersonComponent } from 'src/app/modules/dashboard/components/sales-person/sales-person.component';
import { ListProductComponent } from 'src/app/modules/product/component/list-product/list-product.component';


const routes: Routes = [

  {
    path: 'dashboard',
    component: SalesPersonComponent
  },

  {
    path: 'product',
    component: ListProductComponent,
    data: {
      title: 'sales',
      breadcrumb: [
        {
          label: 'home',
          url: '/sales/dashboard'
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
          url: '/sales/dashboard'
        },
        {
          label: 'cash-register',
          url: ''
        }
      ]
    },
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRepRouting { }
