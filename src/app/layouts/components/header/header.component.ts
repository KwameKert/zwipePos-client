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
  profileLinks: Array<object> = [
    {name: 'Profile', icon: 'zmdi zmdi-account-circle', url: "/settings/profile"},
    {name: 'Settings', icon: 'zmdi zmdi-account-circle', url: "/settings/password"} 
  ]

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
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
