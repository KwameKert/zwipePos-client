import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  role: "Merchant"
  pageTitle: string;
  sideBarOpen = true;
  links: Array<object> = [
    {name: "Dashboard", icon: "mdi mdi-home mr-1", url: "/merchant/dashboard"},
    {name: "Category", icon: "fe-layers mr-1", url: "/merchant/category"},
    {name: "Transaction", icon: "fas fa-receipt mr-1", url: "/merchant/transaction"},
    {name: "Cash Register", icon: " fas fa-cash-register mr-1", url: "/merchant/transaction"},

  ];
  breadcrumbConfig: object = {
    bgColor: '#eee',
    fontSize: '14px',
    fontColor: '#0275d8',
    lastLinkColor: '#000',
    symbol: ' >',
  }
   breadcrumbs  =  [
    {
      label:'home',
      url: ''
    }]
  
  constructor(private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService) { 
    this.ngDynamicBreadcrumbService.updateBreadcrumb(this.breadcrumbs)
  }

  ngOnInit() {
  }

  toggleSidebar(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  changeTitle(title: string){
    this.pageTitle = title;
  }


  
}
