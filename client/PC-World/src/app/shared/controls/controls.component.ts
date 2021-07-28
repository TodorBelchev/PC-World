import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/app-state.interface';
import { add_cart, add_wishlist } from '../../user/store/auth.actions';
import * as authSelectors from '../../user/store/auth.selectors';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { ISimpleProduct } from '../interfaces/simple-product.interface';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  faCheckSquare = faCheckSquare;
  @Output() showModalEvent: EventEmitter<any> = new EventEmitter();
  @Input() showModal: boolean = false;
  @Input() productName: string = '';
  @Input() product: ISimpleProduct | undefined;
  user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);
  constructor(
    private store: Store<AppState>
  ) { }

  onAddToCartClick(): void {
    this.store.dispatch(add_cart({ _id: this.product!._id, quantity: 1, productType: this.productName }));
  }

  onAddToWishlistClick(): void {
    this.store.dispatch(add_wishlist({ _id: this.product!._id, productType: this.productName }));
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
