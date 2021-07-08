import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import * as fromAuth from './store/auth.reducer';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.authReducer)
  ]
})
export class AuthModule { }
