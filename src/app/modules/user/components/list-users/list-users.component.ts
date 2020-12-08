import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteItemComponent } from 'src/app/modules/shared/delete-item/delete-item.component';
import { UserService } from '../../user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  shop = JSON.parse(localStorage.getItem("shop"));

  displayedColumns: Array<string> = ['role','fullName','phoneNumber','email','status','createdAt', 'actions'];
  dataSource: MatTableDataSource<any> ;
  categories: any;
  isEmpty = false;
  isLoading = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async fetchUsers(){
    try{
      this.isLoading  = true;
      let response = await this.userService.fetchUsers(this.shop.id);
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

addUser(){
  const dialogRef = this.dialog.open(AddUserComponent, {
    width: '600px',
    height: '350px'
  })
  dialogRef.afterClosed().subscribe(result => {
   this.fetchUsers();
  }, error=>{
    // this._toastr.error("Oops an error. 🥺","",{
    //   timeOut:2000
    // })
  });
}

viewUser(data: any){
  const dialogRef = this.dialog.open(ViewUserComponent, {
    width: '450px',
    height: '550px',
    data
  })
  dialogRef.afterClosed().subscribe(result => {
   
  }, error=>{
    // this._toastr.error("Oops an error. 🥺","",{
    //   timeOut:2000
    // })
  });
}

 
  editUser(data: any){
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
      height: '350px',
      data
    })
    dialogRef.afterClosed().subscribe(result => {
     this.fetchUsers();
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });
  }

    deleteUser(_id: Number){
    let data = {
    model: "user", _id, word: "DELETe user"
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '280px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this.fetchUsers();
      }else{

      }
    });
  }

}
