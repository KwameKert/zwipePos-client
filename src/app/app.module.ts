import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent, SidebarComponent, FooterComponent, AuthLayoutComponent, DefaultComponent, PageTitleComponent} from './layouts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthInterceptor, ErrorInterceptor } from './interceptors';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { SalesComponent } from './layouts/sales/sales.component';
//import { NgxUiLoaderModule } from 'ngx-ui-loader/lib/core/ngx-ui-loader.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
     SidebarComponent, 
     FooterComponent, 
     AuthLayoutComponent,
     PageTitleComponent,
     DefaultComponent,
     SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgDynamicBreadcrumbModule,
    NgxUiLoaderModule,
      ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
  }),
  ],
  providers: [
    DatePipe, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
