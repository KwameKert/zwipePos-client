import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() titleChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  //  console.log(this.links)
  }


  updateTitle(link: string){
    //console.log("header here")
    this.titleChange.emit(link);
  }

    



}
