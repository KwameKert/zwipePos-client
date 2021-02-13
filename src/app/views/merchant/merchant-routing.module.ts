import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantComponent } from 'src/app/modules/dashboard/components/merchant/merchant.component';
import { ListCategoryComponent } from 'src/app/modules/category/components/list-category/list-category.component';
import { ListProductComponent } from 'src/app/modules/product/component/list-product/list-product.component';
import { ShopingCartComponent } from 'src/app/modules/cash-register/components/shoping-cart/shoping-cart.component';
import { ReceiptListComponent } from 'src/app/modules/cash-register/components/receipt-list/receipt-list.component';
import { TitheComponent } from 'src/app/modules/contributions/tithe/tithe.component';
import { ListUsersComponent } from 'src/app/modules/user/components/list-users/list-users.component';
import { CommissionComponent } from 'src/app/modules/contributions/commission/commission.component';
import { ListUnitComponent } from 'src/app/modules/unit/components/list-unit/list-unit.component';


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
  },
  {
    path: 'transaction',
    component: ReceiptListComponent,
    data: {
      title: 'transaction',
      breadcrumb: [
        {
          label: 'home',
          url: '/merchant/dashboard'
        },
        {
          label: 'transaction',
          url: ''
        }
      ]
    },
  },
  {
    path: 'tithe',
    component: TitheComponent,
    data: {
      title: 'tithe',
      breadcrumb: [
        {
          label: 'home',
          url: '/merchant/dashboard'
        },
        {
          label: 'tithe',
          url: ''
        }
      ]
    },
  },
  {
    path: 'users',
    component: ListUsersComponent,
    data: {
      title: 'users',
      breadcrumb: [
        {
          label: 'home',
          url: '/merchant/dashboard'
        },
        {
          label: 'users',
          url: ''
        }
      ]
    },
  },
  {
    path: 'commission',
    component: CommissionComponent,
    data: {
      title: 'commission',
      breadcrumb: [
        {
          label: 'home',
          url: '/merchant/dashboard'
        },
        {
          label: 'commission',
          url: ''
        }
      ]
    },
  },
  {
    path: 'unit',
    component: ListUnitComponent,
    data: {
      title: 'unit',
      breadcrumb: [
        {
          label: 'home',
          url: '/merchant/dashboard'
        },
        {
          label: 'unit',
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
