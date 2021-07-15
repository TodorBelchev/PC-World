import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { faSearch, faUser, faShoppingCart, faHeart, faDesktop } from '@fortawesome/free-solid-svg-icons';

import * as authSelectors from '../../auth/store/auth.selectors';
import { cartProps } from '../../auth/store/auth.actions';
import { AppState } from 'src/app/shared/app-state.interface';
import { IUser } from 'src/app/auth/user.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  faDesktop = faDesktop;
  cartItemsCount: number = 0;
  user$: Observable<IUser | null> = this.store.pipe(select(authSelectors.selectUser));
  cart$: Observable<cartProps[] | []> = this.store.pipe(select(authSelectors.selectCart));
  wishlist$: Observable<{ _id: string }[] | []> = this.store.pipe(select(authSelectors.selectWishlist));

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.cart$.subscribe(
      data => {
        this.cartItemsCount = [...data].reduce((acc, curr) => acc + curr.quantity, 0);
      },
      error => {
        console.log(error.message);
      });
  }

}
