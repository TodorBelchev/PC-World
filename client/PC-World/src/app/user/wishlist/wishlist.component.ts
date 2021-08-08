import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { faCheckSquare, faWindowClose, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import * as authSelectors from '../store/auth.selectors';
import * as authActions from '../store/auth.actions';
import { wishlistProps } from '../store/auth.actions';
import { NotebookService } from 'src/app/notebook/notebook.service';
import { first } from 'rxjs/operators';
import { PartsService } from 'src/app/parts/parts.service';
import { MonitorService } from 'src/app/monitor/monitor.service';
import { IProduct } from 'src/app/shared/interfaces/simple-product.interface';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, AfterContentChecked, OnDestroy {
  faCheckSquare = faCheckSquare;
  faWindowClose = faWindowClose;
  faCartPlus = faCartPlus;
  wishlist$: Observable<wishlistProps[]> = this.store.select(authSelectors.selectWishlist);
  wishlistSub: Subscription = new Subscription();
  products: IProduct[] = [];
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;

  constructor(
    private store: Store<AppState>,
    private notebookService: NotebookService,
    private monitorService: MonitorService,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    this.wishlistSub = this.wishlist$.pipe(first()).subscribe(
      wishlist => {
        this.isLoading = true;
        this.products = this.fetchWishlist(wishlist);
      },
      error => {
        this.isLoading = false;
        this.message = error.error.message || 'Something went wrong. Please try again later.';
        this.msgType = 'error';
      }
    );
  }

  ngAfterContentChecked(): void {
    this.products.sort((a, b) => b.price - a.price);
  }

  ngOnDestroy(): void {
    this.wishlistSub.unsubscribe();
  }

  fetchWishlist(wishlist: wishlistProps[]): IProduct[] {
    const fetchedWishlist: IProduct[] = [];
    if (wishlist.length == 0) {
      this.isLoading = false;
      return [];
    }
    wishlist.forEach((x: { _id: string, productType: string }) => {
      if (x.productType === 'notebooks') {
        this.notebookService.getById(x._id).subscribe(
          notebook => {
            this.isLoading = false;
            fetchedWishlist.push({
              _id: notebook._id,
              brand: notebook.brand,
              images: notebook.images,
              model: notebook.model,
              price: Number(notebook.price),
              promoPrice: Number(notebook.promoPrice),
              quantity: Number(notebook.quantity),
              warranty: Number(notebook.warranty),
              type: x.productType,
              urlPrefix: x.productType
            });
          },
          error => {
            this.message = error.error.message || 'Something went wrong. Please try again later.';
            this.msgType = 'error';
            this.isLoading = false;
          }
        )
      } else if (x.productType === 'monitors') {
        this.monitorService.getItem(x._id).subscribe(
          monitor => {
            this.isLoading = false;
            fetchedWishlist.push({
              _id: monitor._id,
              brand: monitor.brand,
              images: monitor.images,
              model: monitor.model,
              price: Number(monitor.price),
              promoPrice: Number(monitor.promoPrice),
              quantity: Number(monitor.quantity),
              warranty: Number(monitor.warranty),
              type: x.productType
            });
          },
          error => {
            this.message = error.error.message || 'Something went wrong. Please try again later.';
            this.msgType = 'error';
            this.isLoading = false;
          }
        )
      } else if (x.productType !== '') {
        this.partsService.getItem(x.productType, x._id).subscribe(
          part => {
            this.isLoading = false;
            fetchedWishlist.push({
              _id: part!._id,
              brand: part!.brand,
              images: part!.images,
              model: part!.model,
              price: Number(part!.price),
              promoPrice: Number(part!.promoPrice),
              quantity: Number(part!.quantity),
              warranty: Number(part!.warranty),
              type: x.productType,
              urlPrefix: `/components/${x.productType}`
            });
          },
          error => {
            this.message = error.error.message || 'Something went wrong. Please try again later.';
            this.msgType = 'error';
            this.isLoading = false;
          }
        )
      }
    });
    return fetchedWishlist;
  }

  onAddToCartClick(product: IProduct): void {
    this.store.dispatch(authActions.add_cart({ _id: product._id, productType: product.type, quantity: 1 }));
  }

  onRemoveFromWishlistClick(product: IProduct): void {
    this.store.dispatch(authActions.remove_from_wishlist({ _id: product._id, productType: product.type }));
    const isPresent = this.products.find(x => x._id === product._id);
    if (isPresent) {
      const index = this.products.indexOf(isPresent);
      this.products.splice(index, 1);
    }
  }

}