import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faSearch, faUser, faShoppingCart, faHeart, faDesktop, faCogs } from '@fortawesome/free-solid-svg-icons';

import * as authSelectors from '../../user/store/auth.selectors';
import * as authActions from '../../user/store/auth.actions';
import { cartProps } from '../../user/store/auth.actions';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';


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
  faCogs = faCogs;
  isToggled: boolean = false;
  cartItemsCount: number = 0;
  user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);
  cart$: Observable<cartProps[] | []> = this.store.select(authSelectors.selectCart);
  wishlist$: Observable<{ _id: string }[] | []> = this.store.select(authSelectors.selectWishlist);

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
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

  onLogout(): void {
    this.authService.logout().subscribe(
      res => {
        this.store.dispatch(authActions.logout_user());
        this.router.navigateByUrl('/');
        this.onToggleClick();
      },
      error => {
        console.log(error.error.message);
      }
    )
  }

  onToggleClick(): void {
    this.isToggled = !this.isToggled;
  }

}
