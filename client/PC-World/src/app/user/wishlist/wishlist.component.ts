import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { faCheckSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { AppState } from 'src/app/shared/app-state.interface';
import * as authSelectors from '../store/auth.selectors';
import * as authActions from '../store/auth.actions';
import { wishlistProps } from '../store/auth.actions';
import { NotebookService } from 'src/app/notebook/notebook.service';
import { first } from 'rxjs/operators';
import { PartsService } from 'src/app/parts/parts.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, AfterContentChecked, OnDestroy {
  faCheckSquare = faCheckSquare;
  faWindowClose = faWindowClose;
  wishlist$: Observable<wishlistProps[]> = this.store.select(authSelectors.selectWishlist);
  wishlistSub: Subscription = new Subscription();
  products: IProduct[] = [];

  constructor(
    private store: Store<AppState>,
    private notebookService: NotebookService,
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    this.wishlistSub = this.wishlist$.pipe(first()).subscribe(
      wishlist => {
        this.products = this.fetchWishlist(wishlist);
      },
      error => {
        console.log(error.message);
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
    wishlist.forEach((x: { _id: string, productType: string }) => {
      if (x.productType === 'notebooks') {
        this.notebookService.getById(x._id).subscribe(
          notebook => {
            fetchedWishlist.push({ ...notebook, type: x.productType, urlPrefix: x.productType });
          },
          error => {
            console.log(error.message);
          }
        )
      } else if (x.productType === 'monitors') {

      } else {
        this.partsService.getItem(x.productType, x._id).subscribe(
          part => {
            fetchedWishlist.push({ ...part, type: x.productType, urlPrefix: `/components/${x.productType}` });
          },
          error => {
            console.log(error.message);
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

export interface IProduct {
  _id: string;
  images: string[];
  brand: string;
  model: string;
  price: number;
  promoPrice: number;
  type: string;
  quantity: number;
  warranty: number;
  urlPrefix?: string;
}