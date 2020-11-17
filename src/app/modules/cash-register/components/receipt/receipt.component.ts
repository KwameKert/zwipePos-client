import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  customerName: string;
  customerPhone: string;
  constructor(public dialogRef: MatDialogRef<ReceiptComponent>,   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }


  close(){
 
    this.dialogRef.close({success:false});
  }

  generateReceipt(){
    let data =  {
      customerName: this.customerName,
      customerPhone: this.customerPhone,
    }
    this.dialogRef.close({success: true, data});
  }


}
