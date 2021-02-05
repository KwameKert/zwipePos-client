import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CashRegisterService } from '../../cash-register.service';
import { ViewReceiptComponent } from '../view-receipt/view-receipt.component';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {

  shop = JSON.parse(localStorage.getItem("shop"));
  displayedColumns: Array<string> = ['code','amount', 'profit','customerName','createdAt', 'customerPhone', 'actions'];
  dataSource: MatTableDataSource<any> = null ;
  receipts: any;
  isEmpty = false;
  isLoading = false;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private _transactionService: CashRegisterService, private dialog: MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.fetchReceipts();
  }


  async fetchReceipts(){
    try{
      this.isLoading  = true;
      let response = await this._transactionService.fetchTransactions(this.shop.id);
      if(response && response.data.length != 0){
        let result = response.data
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;  
      }else{
        this.isEmpty = true;
      }

    }catch(error){

    }finally{
      this.isLoading=false;
    }
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


viewReceipt(id: number){
  this.dialog.open(ViewReceiptComponent, {
    width: '900px',
    height: '420px',
    data: id
        })
 
}

}
