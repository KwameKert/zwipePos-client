import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PreloaderComponent } from './preloader/preloader.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { ExcerptFilter } from './pipes/excerpts.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { NgSelectModule } from '@ng-select/ng-select';

// import { AvatarModule } from 'ngx-avatar/lib/avatar.module';
// import { ToastrModule } from 'ngx-toastr';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader/lib/ngx-skeleton-loader.module';



@NgModule({
  declarations: [PreloaderComponent, DateAgoPipe, ExcerptFilter, DeleteItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    NgSelectModule,
    
  //   NgxSkeletonLoaderModule,
  //   ToastrModule.forRoot({
  //     positionClass: 'toast-top-right',
  //     preventDuplicates: true,
  // }), 
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    PreloaderComponent,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    DateAgoPipe, 
    ExcerptFilter,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    MatMenuModule,
    NgSelectModule,
  ],
  entryComponents: [DeleteItemComponent]
})
export class SharedModule { }
