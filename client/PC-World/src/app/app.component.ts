import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { AppState } from './shared/interfaces/app-state.interface';
import * as authActions from './user/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PC-World';

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.authService.loadCart();
    this.authService.loadWishlist();
    this.authService.autoAuth();
  }
}
