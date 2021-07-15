import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/app-state.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localStorage = localStorage;
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  login(userData: { email: string, password: string }): Observable<Object> {
    return this.http.post(environment.api_url + 'user/login', userData, { withCredentials: true });
  }

  register(userData: { email: string, password: string }): Observable<Object> {
    return this.http.post(environment.api_url + 'user/register', userData, { withCredentials: true });
  }

  addToCart(product: AuthActions.cartProps): Observable<any> {
    let storage = this.localStorage.getItem('cart');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
    const isPresent = currentStorage.find((x: AuthActions.cartProps) => x._id == product._id);

    if (isPresent) {
      const index = currentStorage.indexOf(isPresent);
      currentStorage[index].quantity = currentStorage[index].quantity + 1;
    } else {
      currentStorage.push(product);
    }

    this.localStorage.setItem('cart', JSON.stringify(currentStorage));
    return of(currentStorage);
  }

  addToWishlist(product: AuthActions.cartProps): Observable<any> {
    let storage = this.localStorage.getItem('wishlist');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('wishlist') || '') : null;
    const isPresent = currentStorage.find((x: AuthActions.cartProps) => x._id == product._id);

    if (!isPresent) {
      currentStorage.push(product);
    }

    this.localStorage.setItem('wishlist', JSON.stringify(currentStorage));
    return of(currentStorage);
  }

  loadCart() {
    let storage = this.localStorage.getItem('cart');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
    currentStorage.forEach((x: { _id: string, quantity: number }) => {
      this.store.dispatch(AuthActions.auto_load_cart({ _id: x._id, quantity: x.quantity }))
    });
  }

  loadWishlist() {
    let storage = this.localStorage.getItem('wishlist');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('wishlist') || '') : null;
    currentStorage.forEach((x: { _id: string, quantity: number }) => {
      this.store.dispatch(AuthActions.auto_load_wishlist({ _id: x._id, quantity: x.quantity }))
    });
  }
}