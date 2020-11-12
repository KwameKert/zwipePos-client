import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { SharedModule } from '../shared/shared.module';
import { ViewCategoryComponent } from './components/view-category/view-category.component';



@NgModule({
  declarations: [AddCategoryComponent, ListCategoryComponent, ViewCategoryComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListCategoryComponent
  ]
})
export class CategoryModule { }
