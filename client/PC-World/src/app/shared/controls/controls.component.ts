import { Component, Input, OnInit } from '@angular/core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.interface';
import { add_cart, add_wishlist } from '../../auth/store/auth.actions';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  faCheckSquare = faCheckSquare;
  @Input() product: { _id: string, price: number, quantity: number, promoPrice: number } = {
    _id: '',
    price: 0,
    quantity: 0,
    promoPrice: 0,
  };
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  onAddToCartClick(): void {
    this.store.dispatch(add_cart({ _id: this.product._id, quantity: 1 }));
  }

  onAddToWishlistClick(): void {
    this.store.dispatch(add_wishlist({ _id: this.product._id, quantity: 1 }));
  }
}
