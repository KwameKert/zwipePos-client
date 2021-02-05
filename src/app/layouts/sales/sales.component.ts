import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  role = JSON.parse(localStorage.getItem("user")).role;
  pageTitle: string;
  sideBarOpen = true;
  
  headerLinks: Array<object> = [
    {name: 'Profile', icon: 'fas fa-user', url: "/admin/profile"},
    {name: 'Settings', icon: 'fas fa-cogs', url: "/admin/settings"} 
  ]
  links: Array<object> = [
    {name: "Dashboard", icon: "mdi mdi-home mr-1", url: "/sales/dashboard"},
    {name: "Product", icon: "mdi mdi-cart mr-1", url: "/sales/product"},
    {name: "Cash Register", icon: " fas fa-cash-register mr-1", url: "/sales/cash-register"}

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
