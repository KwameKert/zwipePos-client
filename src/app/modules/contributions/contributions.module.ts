import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitheComponent } from './tithe/tithe.component';
import { SharedModule } from '../shared/shared.module';
import { CommissionComponent } from './commission/commission.component';



@NgModule({
  declarations: [TitheComponent, CommissionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TitheComponent,
    CommissionComponent
  ]
})
export class ContributionsModule { }
