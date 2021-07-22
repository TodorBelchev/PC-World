import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RouterModule } from '@angular/router';
import { AsideItemPriceComponent } from './aside-item-price/aside-item-price.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromShared from './store/shared.reducer';
import { ImagesComponent } from './images/images.component';
import { ControlsComponent } from './controls/controls.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentsComponent } from './comments/comments.component';
import { AddCommentModalComponent } from './add-comment-modal/add-comment-modal.component';
import { DatePipe } from './pipes/date.pipe';
import { ProductTypePipe } from './pipes/product-type.pipe';
import { WarrantyExpirationDatePipe } from './pipes/warranty-expiration-date.pipe';



@NgModule({
  declarations: [
    AsideComponent,
    PaginatorComponent,
    AsideItemPriceComponent,
    ImagesComponent,
    ControlsComponent,
    CommentsComponent,
    AddCommentModalComponent,
    DatePipe,
    ProductTypePipe,
    WarrantyExpirationDatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StoreModule.forFeature(fromShared.featureKey, fromShared.sharedReducer)
  ],
  exports: [
    AsideComponent,
    PaginatorComponent,
    ImagesComponent,
    ControlsComponent,
    CommentsComponent,
    AddCommentModalComponent,
    DatePipe,
    ProductTypePipe,
    WarrantyExpirationDatePipe
  ]
})
export class SharedModule { }
