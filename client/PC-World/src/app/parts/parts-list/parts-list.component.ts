import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { PartsService } from '../parts.service';
import * as authSelectors from '../../user/store/auth.selectors';
import * as authActions from '../../user/store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.scss']
})
export class PartsListComponent implements OnInit, OnDestroy {
  products: [] = [];
  type: string = '';
  page: number = 1;
  count: number = 0;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  timeout: any;
  messageSub: Subscription = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        this.type = this.activatedRoute.snapshot.url[0].path;
        this.page = params['page'];
        let query = '';

        Object.entries(params).forEach(([k, v]) => {
          query += '&' + k + '=' + v;
        });

        query += `&product=${this.type}`;

        this.isLoading = true;
        return this.partsService.getItems(query)
      })).subscribe(
        data => {
          this.products = data.products;
          this.count = data.count;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.message = error.error.message || 'Something went wrong. Please try again later.';
          this.msgType = 'error';
        }
      );

    this.messageSub = this.store.select(authSelectors.selectMessage).subscribe(
      message => {
        this.message = message?.text;
        this.msgType = message?.msgType;
        clearTimeout(this.timeout);
        if (this.msgType === 'success') {
          this.timeout = setTimeout(() => {
            this.store.dispatch(authActions.clear_message());
          }, 3000);
        }
      }
    );
  };

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
  }

  onCloseNotificatrion(): void {
    this.store.dispatch(authActions.clear_message());
    clearTimeout(this.timeout);
  }
}
