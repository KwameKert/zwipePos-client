import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/authentication/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() titleChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() role;
  shopName = "Zwipe"
  @Input() profileLinks;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    let shop = JSON.parse(localStorage.getItem("shop"));
    this.shopName = shop.name;
  }

  updateTitle(link: string){
    //console.log("header here")
    this.titleChange.emit(link);
  }

  logout(){
      this._authService.logout();
      this._router.navigate(['/login']);
  }

}
