import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  shopId: number = JSON.parse(localStorage.getItem('shop')).id 
  constructor(  public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,private userService: UserService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    if(this.data){
      this.loadEditForm()
    }else{
      this.loadForm();
    }
  }

  loadForm(){
    this.userForm = this.fb.group({
      shopId: this.shopId,
      username: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    })
  }

  loadEditForm(){
    this.userForm = this.fb.group({
      shopId: this.shopId,
      id: this.data.id,
      username: new FormControl(this.data.username, Validators.required),
      fullName: new FormControl(this.data.fullName, Validators.required),
      role: new FormControl(this.data.role, Validators.required),
      email: new FormControl(this.data.email, [Validators.email, Validators.required]),
      phoneNumber: new FormControl(this.data.phoneNumber, Validators.required),
      status: new FormControl(this.data.status, Validators.required)
    })
  }



  async saveUser(){

    this.ngxService.start();
    try{
      let result;
      if(this.data){
        result = await this.userService.updateItem(this.userForm.value);
      }else{
         result = await this.userService.addItem(this.userForm.value);
      }
      console.log(result)
      if(result.status== 201 || result.status== 200 ){
        this.dialogRef.close({success: true});
      }
    }catch(e){
      console.error(e);
    }finally{
      this.ngxService.stop();
    }


  }


  close(){
    this.dialogRef.close();
  
 }




}
