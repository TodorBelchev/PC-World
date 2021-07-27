import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces/user.interface';
import * as AuthActions from '../user/store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  localStorage = localStorage;
  constructor(
    private http: HttpClient,
  ) { }

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

  addToWishlist(product: AuthActions.wishlistProps): Observable<any> {
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

  removeFromWishlist(product: AuthActions.wishlistProps): Observable<any> {
    let storage = this.localStorage.getItem('wishlist');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('wishlist') || '') : null;
    const isPresent = currentStorage.find((x: AuthActions.cartProps) => x._id == product._id);

    if (isPresent) {
      const index = currentStorage.indexOf(isPresent);
      currentStorage.splice(index, 1);
    }

    this.localStorage.setItem('wishlist', JSON.stringify(currentStorage));
    return of(currentStorage);
  }

  removeFromCart(product: AuthActions.cartProps): Observable<any> {
    let storage = this.localStorage.getItem('cart');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
    const isPresent = currentStorage.find((x: AuthActions.cartProps) => x._id == product._id);

    if (isPresent) {
      const index = currentStorage.indexOf(isPresent);
      currentStorage.splice(index, 1);
    }

    this.localStorage.setItem('cart', JSON.stringify(currentStorage));
    return of(currentStorage);
  }

  increaseQuantityInCart(product: AuthActions.cartProps): Observable<any> {
    let storage = this.localStorage.getItem('cart');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
    const isPresent = currentStorage.find((x: AuthActions.cartProps) => x._id == product._id);

    if (isPresent) {
      isPresent.quantity++;
      const index = currentStorage.indexOf(isPresent);
      currentStorage.splice(index, 1, isPresent);
    }

    this.localStorage.setItem('cart', JSON.stringify(currentStorage));
    return of(currentStorage);
  }

  decreaseQuantityInCart(product: AuthActions.cartProps): Observable<any> {
    let storage = this.localStorage.getItem('cart');
    let currentStorage = [];
    storage ? currentStorage = JSON.parse(this.localStorage.getItem('cart') || '') : null;
    const isPresent = currentStorage.find((x: AuthActions.cartProps) => x._id == product._id);

    if (isPresent) {
      isPresent.quantity--;
      const index = currentStorage.indexOf(isPresent);
      currentStorage.splice(index, 1, isPresent);
    }

    this.localStorage.setItem('cart', JSON.stringify(currentStorage));
    return of(currentStorage);
  }

  emptyCart(): Observable<any> {
    this.localStorage.setItem('cart', JSON.stringify([]));
    return of([]);
  }

  loadProfile(): Observable<any> {
    return this.http.get(environment.api_url + 'user/verify', { withCredentials: true });
  }

  editProfile(profile: IUser): Observable<any> {
    return this.http.put(environment.api_url + 'user', profile, { withCredentials: true });
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(environment.api_url + 'orders', orderData, { withCredentials: true });
  }

  getOrders(userId: string): Observable<any> {
    return this.http.get(environment.api_url + `orders/customer/${userId}`, { withCredentials: true });
  }

  getWarranties(): Observable<any> {
    return this.http.get(environment.api_url + `user/warranties`, { withCredentials: true });
  }
}
