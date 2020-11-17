import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CashRegisterService } from '../../cash-register.service';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {

  shop = JSON.parse(localStorage.getItem("shop"));
  displayedColumns: Array<string> = ['code','amount','customerName','createdAt', 'customerPhone', 'actions'];
  dataSource: MatTableDataSource<any> ;
  receipts: any;
  isEmpty = false;
  isLoading = false;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private _transactionService: CashRegisterService) { }

  ngOnInit(): void {
    this.fetchReceipts();
  }


  async fetchReceipts(){
    try{
      this.isLoading  = true;
      let response = await this._transactionService.fetchTransactions(this.shop.id);
      if(response && response.data.length != 0){
        console.log(response.data)
        this.dataSource = new MatTableDataSource(response.data);
     //   console.log(this.dataSource)
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



}
