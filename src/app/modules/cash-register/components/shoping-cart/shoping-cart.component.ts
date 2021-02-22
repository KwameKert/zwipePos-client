import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CashRegisterService } from '../../cash-register.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { ReceiptComponent } from '../receipt/receipt.component';

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;   

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
  userId: number = JSON.parse(localStorage.getItem('user')).id 
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
    console.log(item)
    let newQuantity = item.quantity + 1
    console.log("beforeS: ",item)
    console.log("new quantity: ",newQuantity)
    console.log("old quantity: ",item.maxQuantity)
    if(newQuantity  <= item.maxQuantity){
      item.total = item.quantity * item.amount;
      item.quantity = newQuantity;
      this.cart[index] = item;
      console.log(this.cart)
      this.updateGradTotal();
    }else{
      console.log("after: ",item)
      console.log("exceeded number")
    }
    
    
  //  console.log(this.cart)
  }

  subtractItemQuantity(index: number){
    let item = this.cart[index];
    if(item.quantity >1){
      item.quantity -=1;
      item.total = item.quantity * item.amount;
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
          userId: this.userId,
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
        this.fetchReceipt(result.data.id);
        
      }
      
    }catch(e){
      console.error(e);
    }finally{
      this.ngxService.stop();
    }
    
  }


  async fetchReceipt(id){
    try{
      this.ngxService.start();
      let result = await this._transactionService.viewTransaction(id);
      if(result.data){
       
        this.generatePDF(result.data.receipt, result.data.transactions);
      }
      
    }catch(e){
      console.error(e);
    }finally{
      this.ngxService.stop();
    }
  }


  generatePDF(receipt, transactions) {  
    let docDefinition = {  
      header: {  
        text: 'ZWIPE IMS',  
        fontSize: 16,  
        alignment: 'center'
      },  
      content: [
        {
          columns: [  
            [  
                {
                  table: {  
                    headerRows: 1,  
                    widths: ['*', 'auto', 'auto', 'auto'],  
                    body: [  
                        ['Product', 'Price', 'Quantity', 'Amount'],  
                        ...transactions.map(p => ([p.productName, p.sellingPrice, p.quantity, (p.amount).toFixed(2)])),  
                        [{ text: 'Total Amount', colSpan: 3 }, {}, {}, (receipt.amount).toFixed(2)]  
                    ]  
                }
                }
            ],  
            [  
                {  
                    text: `Date: ${new Date(receipt.createdAt)}`,  
                    alignment: 'right'  
                },  
                {  
                    text: `Receipt Id : ${receipt.receiptCode}`,  
                    alignment: 'right'  
                }  
            ]  
        ]
        }
      ]  
    };  
   
    pdfMake.createPdf(docDefinition).open();  
  }  

}
