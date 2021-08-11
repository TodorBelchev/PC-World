import { Component, Input } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { ISimpleProduct } from '../interfaces/simple-product.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/app-state.interface';
import { add_cart, add_wishlist, add_message, clear_message } from '../../user/store/auth.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {
  @Input() product!: any;
  @Input() type!: string;
  @Input() category!: string;
  faCartPlus = faCartPlus;
  faHeart = faHeart;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  onAddToCart(product: ISimpleProduct): void {
    let productType = '';
    const routeArr = this.router.url.split('/');

    if (routeArr[1].includes('notebooks')) {
      productType = 'notebooks';
    } else if (routeArr.includes('monitors')) {
      productType = 'monitors';
    } else {
      productType = routeArr[2].split('?')[0];
    }

    this.store.dispatch(add_cart({ _id: product!._id, quantity: 1, productType }));
    this.store.dispatch(add_message({ msgType: 'success', text: 'Successfully added to cart.' }));
  }

  onAddToWishlist(product: ISimpleProduct): void {
    let productType = '';
    const routeArr = this.router.url.split('/');

    if (routeArr[1].includes('notebooks')) {
      productType = 'notebooks';
    } else if (routeArr.includes('monitors')) {
      productType = 'monitors';
    } else {
      productType = routeArr[2].split('?')[0];
    }

    this.store.dispatch(add_wishlist({ _id: product!._id, productType }));
    this.store.dispatch(add_message({ msgType: 'success', text: 'Successfully added to wishlist.' }));
  }

}
