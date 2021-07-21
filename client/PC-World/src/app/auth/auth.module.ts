import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import * as fromAuth from './store/auth.reducer';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserAsideComponent } from './user-aside/user-aside.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersListItemComponent } from './orders-list-item/orders-list-item.component';
import { ProductTypePipe } from './product-type.pipe';
import { DatePipe } from './date.pipe';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WishlistComponent,
    UserAsideComponent,
    ProfileComponent,
    CartComponent,
    OrdersListComponent,
    OrdersListItemComponent,
    ProductTypePipe,
    DatePipe
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.authReducer)
  ]
})
export class AuthModule { }
