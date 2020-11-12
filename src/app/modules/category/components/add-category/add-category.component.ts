import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category, CategoryService } from '../../category.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  shopId: number = JSON.parse(localStorage.getItem('shop')).id 
  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private categoryService: CategoryService,    private ngxService: NgxUiLoaderService,) { }

  ngOnInit(): void {
      this.loadForm();
      if(this.data){
        this.loadEditForm(this.data)
      }
  }

  loadForm(){
      this.categoryForm = this.fb.group({
        name: new FormControl('', Validators.required),
        description: '',
        status: new FormControl('', Validators.required),
        shopId: this.shopId
      })

  }

  loadEditForm(data: Category){
    this.categoryForm = this.fb.group({
      id: data.id,
      name: new FormControl(data.name, Validators.required),
      description: data.description,
      status: new FormControl(data.status, Validators.required),
      shopId: this.shopId
    })
  }

  async saveCategory(){
    this.ngxService.start();
    try{
      let result;
      if(this.data){
        result = await this.categoryService.updateItem(this.categoryForm.value);
      }else{
         result = await this.categoryService.addItem(this.categoryForm.value);
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
