import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category, CategoryService } from '../../category.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewCategoryComponent } from '../view-category/view-category.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { DeleteItemComponent } from 'src/app/modules/shared/delete-item/delete-item.component';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  shop = JSON.parse(localStorage.getItem("shop"));

  displayedColumns: Array<string> = ['name','description','status','createdAt', 'actions'];
  dataSource: MatTableDataSource<any> ;
  categories: any;
  isEmpty = false;
  isLoading = false;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.fetchCategories();
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  async fetchCategories(){
      try{
        this.isLoading  = true;
        let response = await this.categoryService.fetchCategories(this.shop.id);
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


  viewCategory(data: any){
    const dialogRef = this.dialog.open(ViewCategoryComponent, {
      width: '400px',
      height: '220px',
      data
    })
    dialogRef.afterClosed().subscribe(result => {
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });
  }

  editCategory(data: any){
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
      height: '420px',
      data
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        this.fetchCategories();
      }
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });
  }

  addCategory(data: any){
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
      height: '420px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        this.fetchCategories();
      }
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });
  }


  deleteCategory(_id: Number){
    let data = {
    model: "category", _id, word: "DELETe category"
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '280px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this.fetchCategories();
    
      }else{

      }
    });
  }

}
