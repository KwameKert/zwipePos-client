import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,  FormBuilder,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  loginForm: FormGroup ;
  link: string ;

constructor(private _router: Router, private _fb: FormBuilder,private _authService: AuthService, private _toastr: ToastrService) { }

ngOnInit() {
 
  this.loginForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
  });

}

 async loginUser(){
  this.isLoading  = true;

  try{
    let response = await  this._authService.login(this.loginForm.value);
    if(response){
      //console.log(response)
        let user = response.user;
        switch(user.role){
            case "ADMIN":
              this._toastr.success("Login successful", "Success  😊", {  timeOut:2000});
              return this._router.navigate(['/admin/dashboard']);
              break;
            case "MERCHANT":
                this._toastr.success("Login as Merchant", "Success  😊", {  timeOut:2000});
                return this._router.navigate(['/merchant/dashboard']);
                break;     
            case "SALES_REP":
                this._toastr.success("Login as Sales Rep", "Success  😊", {  timeOut:2000});
                return this._router.navigate(['/sales/dashboard']);
                break;     
            default:
              this._toastr.success("Login successful", "Success  😊", {  timeOut:2000});
              return this._router.navigate(['./admin/dashboard'])  
        }
      }
  }catch(error){
    console.error()
  }finally{
    this.isLoading = false;
  }

}

  redirect(){
    this._router.navigate(['/admin'])
  }
}
