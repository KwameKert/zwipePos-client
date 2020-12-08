import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AddUserComponent, ViewUserComponent, ListUsersComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListUsersComponent
  ]
})
export class UserModule { }
