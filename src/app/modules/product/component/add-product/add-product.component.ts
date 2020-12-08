import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/modules/category/category.service';
import { Product, ProductService } from '../../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  shop = JSON.parse(localStorage.getItem("shop"));
  productForm: FormGroup;
  
  categories: any ;
  isEmpty = false;
  isLoading = false;
  shopId: number = JSON.parse(localStorage.getItem('shop')).id 
  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private productService: ProductService,    private ngxService: NgxUiLoaderService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.fetchCategories();
      this.loadForm();
   
  }

  loadForm(){
      this.productForm = this.fb.group({
        name: new FormControl('', Validators.required),
        description: '',
        status: new FormControl('', Validators.required),
        shopId: this.shopId,
        sellingPrice: new FormControl('', Validators.required),
        costPrice: new FormControl('', Validators.required),
        categoryId: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        minQuantity: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required),
        commission: new FormControl('', Validators.required),
        size: '',
        color: ''
      })

  }

  loadEditForm(data: Product){
    this.productForm = this.fb.group({
      id: data.id,
      name: new FormControl(data.name, Validators.required),
      description: data.description,
      status: new FormControl(data.status, Validators.required),
      shopId: this.shopId,
      sellingPrice: new FormControl(data.sellingPrice, Validators.required),
      costPrice: new FormControl(data.costPrice, Validators.required),
      categoryId: new FormControl(data.categoryId, Validators.required),
      quantity: new FormControl(data.quantity, Validators.required),
      minQuantity: new FormControl(data.minQuantity, Validators.required),
      commission: new FormControl(data.commission, Validators.required),
      weight: data.weight,
      size: data.size,
      color: data.color
    })
  }

  async saveProduct(){
    this.ngxService.start();
    try{
      let result;
      if(this.data){
        result = await this.productService.updateItem(this.productForm.value);
      }else{
         result = await this.productService.addItem(this.productForm.value);
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

 async fetchCategories(){
  try{
    this.isLoading  = true;
    let response = await this.categoryService.fetchCategories(this.shop.id);
    if(response && response.data.length != 0){
     this.categories =  response.data;
     if(this.data){
      this.loadEditForm(this.data)
    }else{
      this.loadForm();
    }
   //   console.log(this.categories)
   
    }else{
      this.isEmpty = true;
    }

  }catch(error){

  }finally{
    this.isLoading=false;
  }
}


}
