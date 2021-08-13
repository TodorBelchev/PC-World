import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as authSelectors from '../../user/store/auth.selectors';
import * as authActions from '../../user/store/auth.actions';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  message: string | undefined;
  isMessage: boolean = false;
  type: string | undefined;
  messageSub: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.messageSub = this.store.select(authSelectors.selectMessage).subscribe(
      message => {
        this.message = message?.text;
        this.type = message?.msgType;
      }
    );
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
    this.store.dispatch(authActions.clear_message());
  }

  onCloseNotification(): void {
    this.store.dispatch(authActions.clear_message());
  }

}
