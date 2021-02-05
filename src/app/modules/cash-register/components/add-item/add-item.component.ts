import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { resolve } from 'dns';
import { type } from 'os';
import { Product, ProductService } from 'src/app/modules/product/product.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  shop = JSON.parse(localStorage.getItem("shop"));
  isLoading: boolean = false;
  isEmpty: boolean = false;
  products: Product[];
  selectedProduct: Product;
  quantity: number =1 ;
  
  constructor(public dialogRef: MatDialogRef<AddItemComponent>, private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  async fetchProducts(){
    try{
      this.isLoading  = true;
      let response = await this.productService.fetchShopProducts(this.shop.id);
      if(response && response.data.length != 0){
        console.log(response.data)
        this.products = response.data;
      }else{
        this.isEmpty = true;
      }

    }catch(error){

    }finally{
      this.isLoading=false;
    }

    }
  

    addToCart(){
      // let amount  = this.selectedProduct.sellingPrice;
      // console.log(typeof(amount + 9));
      let data = {
        productName: this.selectedProduct.name,
        amount: this.selectedProduct.sellingPrice,
        productId: this.selectedProduct.id,
        quantity: this.quantity,
        total: this.quantity * this.selectedProduct.sellingPrice
      }

     this.dialogRef.close({success: true,data});
     //console.log(data);
    }


  close(){
 
    this.dialogRef.close({success: false});
  
 }
}
