import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,HttpHeaderResponse, HttpProgressEvent, HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {tap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../modules/authentication/service/auth.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { ToastrService } from 'ngx-toastr';

export interface Response{
  body: any;
  status: number;
}

@Injectable() export class AuthInterceptor implements HttpInterceptor {

    constructor( private _authService: AuthService, private _toastr:ToastrService ){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        const token  = JSON.parse(localStorage.getItem("token"));
        
        let authReq = req.clone();
        if (token) {
          authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }


        return next.handle(authReq).pipe(
          tap((response: HttpResponse<any>) => {
          
            if(response.type !=0){
            switch (response.body.status) {
              
              case 201: //Created
               this._toastr.success("Record added successfully","Success  👍");
                break;
              
              case 200: //Success
                switch (req.method) {
                  case 'PUT':
                    this._toastr.success("Record updated successfully","Success  👍");
                    break;
                  case 'DELETE':
                    this._toastr.success("Record deleted successfully","Success  👍");
                    break; 
                }
                break;
                case 400:
                  this._toastr.info(response.body.message, "Oops 🥺",{  timeOut:4000});
                  break;
                case 417:
                  this._toastr.error(response.body.message, "Oops 🥺",{  timeOut:4000});
                  break;
              default:
                break;
            }
          }
          }, err => {
            switch (err.status) {
              case 401: //Unauthorized
                const isLogin = this._authService.isLoggedIn()
                if (isLogin) {
                  setTimeout(() => {
                    this._toastr.error("Session expired. Please login","Oops ");
                    this._authService.logout()
                    location.reload()
                  }, 400);
                } else {
                  this._toastr.error(err.error,"Oh Snap");
                }
                break;
              case 403: //Forbidden
                this._toastr.error("You are not authorized to perform this action. Contact your administrator.")
                break;
              case 400: //Bad Request
                this._toastr.info(err.error.message)
                break;
              case 404: //Not Found
                this._toastr.info("Resource doesn't exist.")
                break;
              case 500:  //Internal Server Error
                this._toastr.error(err.error)
                break;
              default:
                this._toastr.error(err.statusText)
                break;
            }
          })
        );
     
     
      }
    

 }

 