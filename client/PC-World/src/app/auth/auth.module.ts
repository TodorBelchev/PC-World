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



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WishlistComponent,
    UserAsideComponent
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
