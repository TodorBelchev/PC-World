import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { IMonitor } from '../../shared/interfaces/monitor.interface';
import { INotebook } from '../../shared/interfaces/notebook.interface';
import { IPartsUnion } from '../../shared/interfaces/parts-union.interface';
import { SharedService } from '../../shared/shared.service';
import * as authSelectors from '../../user/store/auth.selectors';
import * as authActions from '../../user/store/auth.actions';

@Component({
  selector: 'app-promo-page',
  templateUrl: './promo-page.component.html',
  styleUrls: ['./promo-page.component.scss']
})
export class PromoPageComponent implements OnInit {
  productType: string = '';
  promoId: string = '';
  category: string = '';
  products: (IPartsUnion | INotebook | IMonitor)[] = [];
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  messageSub: Subscription = new Subscription();
  timeout: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.productType = this.activatedRoute.snapshot.params['productType'];
    this.promoId = this.activatedRoute.snapshot.params['id'];
    if (this.activatedRoute.snapshot.url[1].path !== 'notebooks' && this.activatedRoute.snapshot.url[1].path !== 'monitors') {
      this.category = 'components';
    }

    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        let query = '';
        Object.entries(params).forEach(([k, v]) => {
          query += '&' + k + '=' + v;
        });

        this.isLoading = true;
        return this.sharedService.getPromotionById(this.promoId, query)
      })).subscribe(
        data => {
          this.products = data.products;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.message = error.error.message || 'Something went wrong. Please try again later.';
          this.msgType = 'error';
        });

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
    this.store.dispatch(authActions.clear_message());
    clearTimeout(this.timeout);
  }

  onCloseNotification(): void {
    this.store.dispatch(authActions.clear_message());
  }

}
