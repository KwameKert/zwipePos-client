import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteItemComponent } from 'src/app/modules/shared/delete-item/delete-item.component';
import { UnitService } from '../../unit.service';
import { AddUnitComponent } from '../add-unit/add-unit.component';

@Component({
  selector: 'app-list-unit',
  templateUrl: './list-unit.component.html',
  styleUrls: ['./list-unit.component.scss']
})
export class ListUnitComponent implements OnInit {

  displayedColumns: Array<string> = ['name','status','createdAt', 'actions'];
  dataSource: MatTableDataSource<any> ;
  categories: any;
  isEmpty = false;
  isLoading = false;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private unitService: UnitService, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.fetchUnits();
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  async fetchUnits(){
      try{
        this.isLoading  = true;
        let response = await this.unitService.fetchAll();
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


 

  editUnit(data: any){
    const dialogRef = this.dialog.open(AddUnitComponent, {
      width: '400px',
      height: '420px',
      data
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        this.fetchUnits();
      }
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });
  }

  addCategory(data: any){
    const dialogRef = this.dialog.open(AddUnitComponent, {
      width: '400px',
      height: '420px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        this.fetchUnits();
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
        this.fetchUnits();
    
      }else{

      }
    });
  }

}
