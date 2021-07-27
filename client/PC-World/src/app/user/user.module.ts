import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAuth from './store/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { CartComponent } from './cart/cart.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersListItemComponent } from './orders-list-item/orders-list-item.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAsideComponent } from './user-aside/user-aside.component';
import { WarrantiesComponent } from './warranties/warranties.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    CartComponent,
    OrdersListComponent,
    OrdersListItemComponent,
    ProfileComponent,
    UserAsideComponent,
    WarrantiesComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.authReducer)
  ]
})
export class UserModule { }
