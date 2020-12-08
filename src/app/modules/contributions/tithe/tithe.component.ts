import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ContributionsService } from '../contributions.service';

@Component({
  selector: 'app-tithe',
  templateUrl: './tithe.component.html',
  styleUrls: ['./tithe.component.scss']
})
export class TitheComponent implements OnInit {

 
  shopId: number = JSON.parse(localStorage.getItem('shop')).id 
  titheForm: FormGroup;
  amount: number = 0;
  constructor(private fb: FormBuilder,  private ngxService: NgxUiLoaderService, private _contributionService: ContributionsService) { }

  ngOnInit(): void {
    this.loadForm();
  }


  loadForm(){
    this.titheForm = this.fb.group({
      shopId: 35,
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      percentage: new FormControl('', Validators.required)
    })

  }

  async computeTithe(data){
    try{
      this.ngxService.start();
      let result = await this._contributionService.computeTithe(data);
      if(result){
        this.amount = result.data;
      }else{
        
      }
    }catch(e){
      console.error(e)
    }finally{
      this.ngxService.stop();
    }
  
  }


}
