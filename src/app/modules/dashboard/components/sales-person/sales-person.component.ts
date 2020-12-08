import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-sales-person',
  templateUrl: './sales-person.component.html',
  styleUrls: ['./sales-person.component.scss']
})
export class SalesPersonComponent implements OnInit {

  totalProducts: Number = 0;
  totalCategories: Number = 0;
  totalTransactions: Number = 0;
  totalProfit: Number = 0;

  shopId: number = JSON.parse(localStorage.getItem('shop')).id 

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashboard();
  }

  async fetchDashboard(){
    try{

      let result = await this.dashboardService.fetchDashboard(this.shopId);
      if(result){
        this.totalCategories = result.data.totalCategories;
        this.totalProducts = result.data.totalProducts;
        this.totalTransactions = result.data.totalTransactions;
        this.totalProfit = result.data.totalProfit;
      }
    }catch(e){
      console.error(e);
    }
  }

}
