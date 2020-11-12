import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { SharedModule } from '../shared/shared.module';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [AddCategoryComponent, ListCategoryComponent, ViewCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    // MatFormFieldModule, 
    // MatButtonModule,
  ],
  exports: [
     ListCategoryComponent, ViewCategoryComponent
  ]
})
export class CategoryModule { }
