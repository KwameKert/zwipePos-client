import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitheComponent } from './tithe/tithe.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [TitheComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TitheComponent
  ]
})
export class ContributionsModule { }
