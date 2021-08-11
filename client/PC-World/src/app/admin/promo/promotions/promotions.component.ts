import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import * as authSelectors from '../../../user/store/auth.selectors';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit, OnDestroy {
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

  onCreatedPromo(): void {
    this.ngOnInit();
  }

  onCloseNotificatrion(): void {
    this.message = undefined;
  }

}
