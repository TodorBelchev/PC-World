import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { INotebook } from 'src/app/shared/interfaces/notebook.interface';
import { NotebookService } from '../notebook.service';
import * as authSelectors from '../../user/store/auth.selectors';
import * as authActions from '../../user/store/auth.actions';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.scss']
})
export class NotebooksListComponent implements OnInit, OnDestroy {
  notebooks: INotebook[] = [];
  pages: string[] = [];
  page: number = 1;
  count: number = 0;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  timeout: any;
  messageSub: Subscription = new Subscription();
  constructor(
    private notebookService: NotebookService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      switchMap(
        params => {
          let query = '';
          Object.entries(params).forEach(([k, v]) => {
            query += '&' + k + '=' + v;
          });
          this.page = params['page'];
          this.isLoading = true;
          return this.notebookService.getItems(query);
        })).subscribe(
          data => {
            this.notebooks = data.products;
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
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
  }

  onCloseNotificatrion(): void {
    this.store.dispatch(authActions.clear_message());
    clearTimeout(this.timeout);
  }
}
