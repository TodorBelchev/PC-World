import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as AuthActions from '../user/store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/interfaces/app-state.interface';
import { IUser } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localStorage = localStorage;
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  login(userData: { email: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(environment.api_url + 'user/login', userData, { withCredentials: true });
  }

  register(userData: { email: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(environment.api_url + 'user/register', userData, { withCredentials: true });
  }

  loadCart() {
    let storage = this.localStorage.getItem('cart');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
    currentStorage.forEach((x: { _id: string, quantity: number, productType: string }) => {
      this.store.dispatch(AuthActions.auto_load_cart({ _id: x._id, quantity: x.quantity, productType: x.productType }))
    });
  }

  loadWishlist() {
    let storage = this.localStorage.getItem('wishlist');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('wishlist') || '') : null;
    currentStorage.forEach((x: { _id: string, productType: string }) => {
      this.store.dispatch(AuthActions.auto_load_wishlist({ _id: x._id, productType: x.productType }))
    });
  }

  autoAuth() {
    this.http.get<AuthActions.authSuccess>(environment.api_url + 'user/verify', { withCredentials: true })
      .subscribe(
        (data: AuthActions.authSuccess) => {
          this.store.dispatch(AuthActions.auth_success({
            email: data.email,
            isAdmin: data.isAdmin,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            _id: data._id,
            phoneNumber: data.phoneNumber || '',
            city: data.city || '',
            location: data.location || ''
          }));
        },
        error => {
          this.store.dispatch(AuthActions.auth_check_fail());
        }
      )
  }

}