import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faCheckSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { AppState } from 'src/app/shared/app-state.interface';
import * as authSelectors from '../store/auth.selectors';
import * as authActions from '../store/auth.actions';
import { wishlistProps } from '../store/auth.actions';
import { NotebookService } from 'src/app/notebook/notebook.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, AfterContentChecked {
  faCheckSquare = faCheckSquare;
  faWindowClose = faWindowClose;
  wishlist$: Observable<wishlistProps[]> = this.store.select(authSelectors.selectWishlist);
  products: IProduct[] = [];

  constructor(
    private store: Store<AppState>,
    private notebookService: NotebookService
  ) { }

  ngOnInit(): void {
    this.wishlist$.subscribe(
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

  fetchWishlist(wishlist: wishlistProps[]): IProduct[] {
    const fetchedWishlist: IProduct[] = [];
    wishlist.forEach((x: { _id: string, productType: string }) => {
      if (x.productType === 'notebooks') {
        this.notebookService.getById(x._id).subscribe(
          notebook => {
            fetchedWishlist.push({ ...notebook, type: x.productType });
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
}