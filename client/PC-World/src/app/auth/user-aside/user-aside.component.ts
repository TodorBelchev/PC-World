import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/app-state.interface';
import * as authSelectors from '../store/auth.selectors';
import { IUser } from '../user.interface';

@Component({
  selector: 'app-user-aside',
  templateUrl: './user-aside.component.html',
  styleUrls: ['./user-aside.component.scss']
})
export class UserAsideComponent implements OnInit {
  url: string = '';
  profileMatch: boolean = false;
  ordersMatch: boolean = false;
  warrantiesMatch: boolean = false;
  user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.url = this.router.url;
    this.profileMatch = !!this.url.match(/^\/profile\/[A-Za-z0-9]+$/);
    this.ordersMatch = !!this.url.match(/^\/profile\/[A-Za-z0-9]+\/orders$/);
    this.warrantiesMatch = !!this.url.match(/^\/profile\/[A-Za-z0-9]+\/warranties$/);
  }

}
