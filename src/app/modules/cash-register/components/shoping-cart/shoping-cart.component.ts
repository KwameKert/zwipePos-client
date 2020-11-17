import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CashRegisterService } from '../../cash-register.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { ReceiptComponent } from '../receipt/receipt.component';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit {

  shop = JSON.parse(localStorage.getItem("shop"));
  netTotal;
  grandTotal;
  cart: Array<any> = [];
  currentDate = new Date();
  receiptId = `${new Date().getFullYear()}${Math.floor(Math.random() * (3000 - 1000) + 4)}`;

  constructor(private dialog: MatDialog, private _transactionService: CashRegisterService,  private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  addItem(){
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '600px',
      height: '320px',
          })
    dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        this.cart.push(result.data);
         this.updateGradTotal()
      }
     
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });
  }

  addItemQuantity(index: number){
    let item = this.cart[index];
    item.itemQuantity +=1;
    item.total = item.itemQuantity * item.itemPrice;
    this.cart[index] = item;
    this.updateGradTotal()
  //  console.log(this.cart)
  }

  subtractItemQuantity(index: number){
    let item = this.cart[index];
    if(item.itemQuantity >1){
      item.itemQuantity -=1;
      item.total = item.itemQuantity * item.itemPrice;
      this.cart[index] = item;
      this.updateGradTotal()
    }
   // console.log(this.cart)
  }

  updateGradTotal(){
    this.grandTotal = this.cart.reduce((acc, item)=> acc +item.total, 0);
    //console.log(total);
  }

  removeItem(i:number) {
   
    this.cart.splice(i, 1);
    this.updateGradTotal();
  }


  async checkout(){
    const dialogRef = this.dialog.open(ReceiptComponent, {
      width: '600px',
      height: '400px',
      data: this.grandTotal
      })
    dialogRef.afterClosed().subscribe(  result => {
      if(result.success){
        let data = {
          shopId: this.shop.id,
          amount: this.grandTotal,
          customerName: result.data.customerName,
          customerPhone: result.data.customerPhone,
          cartItemList: this.cart
        }
        this.saveRecord(data)
     // console.log(data)
      }
     
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });
  }


  async saveRecord(data: any){
    try{
      this.ngxService.start();
      let result = await this._transactionService.addItem(data);
      if(result.data){
        this.cart = [];
        this.grandTotal = 0;
      }
      
    }catch(e){
      console.error(e);
    }finally{
      this.ngxService.stop();
    }
    
  }



}
