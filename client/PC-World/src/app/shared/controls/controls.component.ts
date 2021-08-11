import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheckSquare, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/app-state.interface';
import { add_cart, add_message, add_wishlist } from '../../user/store/auth.actions';
import * as authSelectors from '../../user/store/auth.selectors';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { ISimpleProduct } from '../interfaces/simple-product.interface';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  faCheckSquare = faCheckSquare;
  faCartPlus = faCartPlus;
  faHeart = faHeart;
  faComment = faComment;
  @Output() showModalEvent: EventEmitter<any> = new EventEmitter();
  @Input() showModal: boolean = false;
  @Input() productName: string = '';
  @Input() product: ISimpleProduct | undefined;
  user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);
  quantityClass: string = 'green';
  quantityMessage: string = 'In stock';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    if (this.product!.quantity == 0) {
      this.quantityClass = 'red';
      this.quantityMessage = 'Out of stock';
    } else if (this.product!.quantity < 5) {
      this.quantityClass = 'yellow';
      this.quantityMessage = `Hurry up! Only ${this.product!.quantity} left`;
    }
  }

  onAddToCartClick(): void {
    this.store.dispatch(add_cart({ _id: this.product!._id, quantity: 1, productType: this.productName }));
    this.store.dispatch(add_message({ msgType: 'success', text: 'Successfully added to cart.' }));
  }

  onAddToWishlistClick(): void {
    this.store.dispatch(add_wishlist({ _id: this.product!._id, productType: this.productName }));
    this.store.dispatch(add_message({ msgType: 'success', text: 'Successfully added to wishlist.' }));
  }


  onAddReview(): void {
    this.showModal = !this.showModal;
  }

  onCommentCreated(): void {
    this.showModal = false;
  }

  onHideModal(): void {
    this.showModal = false;
  }

}
