import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CashRegisterService } from '../../cash-register.service';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.scss']
})
export class ViewReceiptComponent implements OnInit {

  transactions: Array<any>;
  receipt: any;
  constructor(
    private _transactionService: CashRegisterService,
    public dialogRef: MatDialogRef<ViewReceiptComponent>,
    private ngxService: NgxUiLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
 
 
    ngOnInit(): void {
      this.loadReceipt()
  }

  async loadReceipt(){
    try{  
     this.ngxService.start();
     console.log("loading receipt")
     let response = await this._transactionService.viewTransaction(this.data);
     if(response && response.data.length != 0){
        this.transactions = response.data.transactions
        this.receipt = response.data.receipt
      
      }else{
        //this.isEmpty = true;
      }

    }catch(error){

    }finally{
     this.ngxService.stop();
      //this.isLoading=false;
    }
  }
  close(){
 
    this.dialogRef.close();
  
 }
}
