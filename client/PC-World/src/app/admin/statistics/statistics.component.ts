import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import * as authSelectors from '../../user/store/auth.selectors';
import * as authActions from '../../user/store/auth.actions';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  message: string | undefined;
  messageSub: Subscription = new Subscription();
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.messageSub = this.store.select(authSelectors.selectMessage).subscribe(
      message => {
        this.message = message?.text;
      }
    )
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
  }

  onCloseNotificatrion(): void {
    this.message = undefined;
    this.store.dispatch(authActions.clear_message());
  }
}