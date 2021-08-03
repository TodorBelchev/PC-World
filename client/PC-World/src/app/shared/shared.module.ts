import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RouterModule } from '@angular/router';
import { AsideItemPriceComponent } from './aside-item-price/aside-item-price.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagesComponent } from './images/images.component';
import { ControlsComponent } from './controls/controls.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentsComponent } from './comments/comments.component';
import { AddCommentModalComponent } from './add-comment-modal/add-comment-modal.component';
import { DatePipe } from './pipes/date.pipe';
import { ProductTypePipe } from './pipes/product-type.pipe';
import { WarrantyExpirationDatePipe } from './pipes/warranty-expiration-date.pipe';
import { PromotionCarouselComponent } from './promotion-carousel/promotion-carousel.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { PromoProductsCarouselComponent } from './promo-products-carousel/promo-products-carousel.component';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { NotificationComponent } from './notification/notification.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AsideItemBrandComponent } from './aside-item-brand/aside-item-brand.component';



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
    WarrantyExpirationDatePipe,
    PromotionCarouselComponent,
    ProductListItemComponent,
    PromoProductsCarouselComponent,
    ShortenTextPipe,
    NotificationComponent,
    SpinnerComponent,
    AsideItemBrandComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
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
    WarrantyExpirationDatePipe,
    PromotionCarouselComponent,
    ProductListItemComponent,
    PromoProductsCarouselComponent,
    NotificationComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
