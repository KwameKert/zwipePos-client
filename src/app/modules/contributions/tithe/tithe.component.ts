import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ContributionsService } from '../contributions.service';

@Component({
  selector: 'app-tithe',
  templateUrl: './tithe.component.html',
  styleUrls: ['./tithe.component.scss']
})
export class TitheComponent implements OnInit {

 percentage: number;
 displayedColumns: Array<string> = ['startDate','endDate','percentage','amount','createdAt',];
 dataSource: MatTableDataSource<any> ;
  shopId: number = JSON.parse(localStorage.getItem('shop')).id 
  titheForm: FormGroup;
  amount: number = 0;
  isLoading: boolean = true;
  percentageForm: FormGroup;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('percentageModal') percentageModal : ElementRef<HTMLElement>;
  constructor(private fb: FormBuilder,  private ngxService: NgxUiLoaderService, private _contributionService: ContributionsService) { }

  ngOnInit(): void {
    this.loadForm();
    this.fetchTithe();
    this.fetchTitheHistory();
  }


  loadForm(){
    this.titheForm = this.fb.group({
      shopId: this.shopId,
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      percentage: new FormControl('', Validators.required)
    })

    this.percentageForm = this.fb.group({
      percentage:  new FormControl('', Validators.required),
      status: 'active'
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

  async fetchTithe(){
    let res = await this._contributionService.getTithePercentage();
    if(res){
      this.percentage = res.data < 1 ? res.data*100: res.data;
      
      this.titheForm.patchValue({
        percentage: this.percentage
      })
    }
  }

  async fetchTitheHistory(){
    let res = await this._contributionService.getTitheHistory();
    if(res){
      this.dataSource = new MatTableDataSource(res.data);
      //   console.log(this.dataSource)
         this.dataSource.paginator = this.paginator;
    }
    this.isLoading = false;
  }


  async savePercentage(){
    let el:HTMLElement = this.percentageModal.nativeElement;
    
    
    let res = await this._contributionService.updateTitheConfig(this.percentageForm.value);
    if(res){
      this.percentage = res.data < 1 ? res.data*100: res.data;
      
      this.titheForm.patchValue({
        percentage: this.percentage
      })
    }
    el.click();

  }
}
