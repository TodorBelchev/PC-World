import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { IMonitor } from 'src/app/shared/interfaces/monitor.interface';
import { MonitorService } from '../monitor.service';
import * as authSelectors from '../../user/store/auth.selectors';
import * as authActions from '../../user/store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss']
})
export class MonitorsListComponent implements OnInit, OnDestroy {
  monitors: IMonitor[] = [];
  page: number = 1;
  count: number = 0;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  timeout: any;
  messageSub: Subscription = new Subscription();
  constructor(
    private monitorService: MonitorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    let query = '';

    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        Object.entries(params).forEach(([k, v]) => {
          query += '&' + k + '=' + v;
        });
        this.page = params['page'];

        this.isLoading = true;
        return this.monitorService.getItems(query);
      })).subscribe(
        data => {
          this.monitors = data.products;
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
      )
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
  }

  onCloseNotificatrion(): void {
    this.store.dispatch(authActions.clear_message());
    clearTimeout(this.timeout);
  }

}
