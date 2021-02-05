import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ViewReceiptComponent } from '../../cash-register/components/view-receipt/view-receipt.component';
import { UserService } from '../../user/user.service';
import { ContributionsService } from '../contributions.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {

  commissionForm: FormGroup;
  amount: Number = 0.0;
  users: any;
  receipts: any;
  shopId: number = JSON.parse(localStorage.getItem('shop')).id 

  constructor(private fb: FormBuilder, private dialog: MatDialog,  private ngxService: NgxUiLoaderService, private _contributionService: ContributionsService, private userService: UserService,) { }

  ngOnInit(): void {
    this.loadForm()
    this.fetchUsers()
 
  }

  loadForm(){
    this.commissionForm = this.fb.group({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required)
    })
  }

  
  async computeCommission(data){
    try{
      this.ngxService.start();
      let result = await this._contributionService.computeCommission(data);
      if(result){
        this.amount = result.data.totalCommission.toFixed(2);
        this.receipts = result.data.receipts;
      }else{
        
      }
    }catch(e){
      console.error(e)
    }finally{
      this.ngxService.stop();
    }
  
  }


  async fetchUsers(){
    try{
      this.ngxService.start();
      let response = await this.userService.fetchUsers(this.shopId);
      if(response && response.data.length != 0){
        this.users = response.data
        console.log(this.users)
      }else{
      }

    }catch(error){

    }finally{
      this.ngxService.stop();
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
