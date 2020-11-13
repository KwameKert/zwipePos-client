import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit {

  netTotal;
  grandTotal;
  cart: Array<any> = [];
  currentDate = new Date();
  receiptId = `${new Date().getFullYear()}${Math.floor(Math.random() * (3000 - 1000) + 4)}`;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addItem(){
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '600px',
      height: '320px',
          })
    dialogRef.afterClosed().subscribe(result => {
      this.cart.push(result.data);
     // console.log(this.cart);
      this.updateGradTotal()
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
  }


}
