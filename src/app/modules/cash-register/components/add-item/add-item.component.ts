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
      let amount  = this.selectedProduct.amount;
      console.log(typeof(amount + 9));
      let data = {
        itemName: this.selectedProduct.name,
        itemPrice: this.selectedProduct.amount,
        itemId: this.selectedProduct.id,
        itemQuantity: this.quantity,
        total: this.quantity * this.selectedProduct.amount
      }

     this.dialogRef.close({data});
     //console.log(data);
    }


  close(){
 
    this.dialogRef.close();
  
 }
}
