import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteItemComponent } from 'src/app/modules/shared/delete-item/delete-item.component';
import { ProductService } from '../../product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { ViewProductComponent } from '../view-product/view-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  shop = JSON.parse(localStorage.getItem("shop"));

  displayedColumns: Array<string> = ['name','category','color','quantity', 'unit price','status','createdAt', 'actions'];
  dataSource: MatTableDataSource<any> ;
  categories: any;
  isEmpty = false;
  isLoading = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async fetchProducts(){
    try{
      this.isLoading  = true;
      let response = await this.productService.fetchShopProducts(this.shop.id);
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

addProduct(data: any){
  const dialogRef = this.dialog.open(AddProductComponent, {
    width: '800px',
    height: '520px'
  })
  dialogRef.afterClosed().subscribe(result => {
   this.fetchProducts();
  }, error=>{
    // this._toastr.error("Oops an error. 🥺","",{
    //   timeOut:2000
    // })
  });
}

viewProduct(data: any){
  const dialogRef = this.dialog.open(ViewProductComponent, {
    width: '600px',
    height: '320px',
    data
  })
  dialogRef.afterClosed().subscribe(result => {
   
  }, error=>{
    // this._toastr.error("Oops an error. 🥺","",{
    //   timeOut:2000
    // })
  });
}

 
  editProduct(data: any){
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '800px',
      height: '520px',
      data
    })
    dialogRef.afterClosed().subscribe(result => {
     this.fetchProducts();
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });
  }

    deleteProduct(_id: Number){
    let data = {
    model: "product", _id, word: "DELETe product"
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '280px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this.fetchProducts();
      }else{

      }
    });
  }
}
