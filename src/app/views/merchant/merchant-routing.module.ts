import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from 'src/app/modules/category/components/add-category/add-category.component';


const routes: Routes = [

  {
    path: 'category',
    component: AddCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class MerchantRoutingModule { }
