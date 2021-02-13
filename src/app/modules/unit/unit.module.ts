import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUnitComponent } from './components/add-unit/add-unit.component';
import { ListUnitComponent } from './components/list-unit/list-unit.component';
import { ViewUnitComponent } from './components/view-unit/view-unit.component';



@NgModule({
  declarations: [AddUnitComponent, ListUnitComponent, ViewUnitComponent],
  imports: [
    CommonModule
  ]
})
export class UnitModule { }
