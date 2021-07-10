import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { faSearch, faUser, faShoppingCart, faHeart, faDesktop } from '@fortawesome/free-solid-svg-icons';

import * as authSelectors from '../../auth/store/auth.selectors';
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
  user$: Observable<IUser | null> = this.store.pipe(select(authSelectors.selectUser));

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

  }

}
