import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  role = JSON.parse(localStorage.getItem("user")).role;
  pageTitle: string;
  sideBarOpen = true;
  
  headerLinks: Array<object> = [
    {name: 'Profile', icon: 'fas fa-user', url: "/admin/profile"},
    {name: 'Settings', icon: 'fas fa-cogs', url: "/admin/settings"} 
  ]
  links: Array<object> = [
    {name: "Dashboard", icon: "mdi mdi-home mr-1", url: "/merchant/dashboard"},
    {name: "Category", icon: "fe-layers mr-1", url: "/merchant/category"},
    {name: "Product", icon: "mdi mdi-cart mr-1", url: "/merchant/product"},
    {name: "Transaction", icon: "fas fa-receipt mr-1", url: "/merchant/transaction"},
    {name: "Cash Register", icon: " fas fa-cash-register mr-1", url: "/merchant/cash-register"},
    {name: "Tithe", icon: "  fas fa-church", url: "/merchant/tithe"},
    {name: "Users", icon: "  fas fa-users-cog", url: "/merchant/users"},
    {name: "Commission", icon: " fas fa-money-bill", url: "/merchant/commission"},

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
