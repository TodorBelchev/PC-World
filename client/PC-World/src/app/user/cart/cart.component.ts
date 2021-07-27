import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import { NotebookService } from 'src/app/notebook/notebook.service';
import { AppState } from 'src/app/shared/app-state.interface';
import * as authActions from '../store/auth.actions';
import * as authSelectors from '../store/auth.selectors';
import { IProduct } from '../wishlist/wishlist.component';
import { first } from 'rxjs/operators';
import { IUser } from '../../shared/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterContentChecked, OnDestroy {
  faCaretSquareUp = faCaretSquareUp;
  faCaretSquareDown = faCaretSquareDown;
  cart$: Observable<authActions.cartProps[]> = this.store.select(authSelectors.selectCart);
  cartSub: Subscription = new Subscription();
  products: IProduct[] = [];
  deliveryPrice = 0;
  totalPrice: number = 0;
  user: IUser = {
    email: '',
    _id: '',
    isAdmin: false,
    city: '',
    location: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };
  orderForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private notebookService: NotebookService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      location: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.cartSub = this.cart$.pipe(first()).subscribe(
      cart => {
        this.products = this.fetchCart(cart);
      },
      error => {
        console.log(error.message);
      }
    );

    this.userService.loadProfile().subscribe(
      user => {
        this.user = Object.assign(this.user, user);
        this.orderForm.patchValue(user);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.products.sort((a, b) => b.price - a.price);
  }

  onSubmit(): void {
    const orderData = this.orderForm.value;
    orderData.products = [...this.products];
    this.userService.placeOrder(orderData).subscribe(
      data => {
        this.store.dispatch(authActions.empty_cart());
        if (this.user._id !== '') {
          this.router.navigateByUrl('/profile/' + this.user._id + '/orders');
        } else {
          this.router.navigateByUrl('/' + this.user._id);
        }
      },
      error => {
        console.log(error.message);
      }
    )
  }

  onRemoveFromCartClick(product: IProduct): void {
    this.store.dispatch(authActions.remove_from_cart({ _id: product._id, quantity: product.quantity, productType: product.type }));
    const isPresent = this.products.find(x => x._id === product._id);
    if (isPresent) {
      const index = this.products.indexOf(isPresent);
      this.products.splice(index, 1);
    }
    this.totalPrice = this.products.reduce((acc, curr) => curr.promoPrice !== 0 ? acc + (curr.promoPrice * curr.quantity) : acc + (curr.price * curr.quantity), 0);
    this.deliveryPrice = this.totalPrice > 100 ? 0 : 10;
  }

  fetchCart(cart: authActions.cartProps[]): IProduct[] {
    const fetchedCart: IProduct[] = [];
    cart.forEach((x: { _id: string, productType: string }, index) => {
      if (x.productType === 'notebooks') {
        this.notebookService.getById(x._id).subscribe(
          notebook => {
            fetchedCart.push({
              _id: notebook._id,
              images: notebook.images,
              brand: notebook.brand,
              model: notebook.model,
              price: notebook.price,
              promoPrice: notebook.promoPrice,
              type: x.productType,
              quantity: cart[index].quantity,
              warranty: notebook.warranty
            });
            notebook.promoPrice !== 0 ? this.totalPrice += notebook.promoPrice * cart[index].quantity : this.totalPrice += notebook.price * cart[index].quantity;
            this.deliveryPrice = this.totalPrice > 100 ? 0 : 10;
          },
          error => {
            console.log(error.message);
          }
        )
      }
    });

    return fetchedCart;
  }

  onDecreaseQuantity(product: IProduct): void {
    if (product.quantity === 1) {
      this.store.dispatch(authActions.remove_from_cart({ _id: product._id, quantity: product.quantity, productType: product.type }));
      const isPresent = this.products.find(x => x._id === product._id);
      if (isPresent) {
        const index = this.products.indexOf(isPresent);
        this.products.splice(index, 1);
      }
    } else {
      this.store.dispatch(authActions.decrease_quantity_from_cart({ _id: product._id, quantity: product.quantity, productType: product.type }));
      const isPresent = this.products.find(x => x._id === product._id);
      if (isPresent) {
        const index = this.products.indexOf(isPresent);
        this.products[index].quantity--;
      }
    }
    this.totalPrice = this.products.reduce((acc, curr) => curr.promoPrice !== 0 ? acc + (curr.promoPrice * curr.quantity) : acc + (curr.price * curr.quantity), 0);
    this.deliveryPrice = this.totalPrice > 100 ? 0 : 10;
  }

  onIncreaseQuantity(product: IProduct): void {
    this.store.dispatch(authActions.increase_quantity_from_cart({ _id: product._id, quantity: product.quantity, productType: product.type }));
    const isPresent = this.products.find(x => x._id === product._id);
    if (isPresent) {
      const index = this.products.indexOf(isPresent);
      this.products[index].quantity++;
    }
    this.totalPrice = this.products.reduce((acc, curr) => curr.promoPrice !== 0 ? acc + (curr.promoPrice * curr.quantity) : acc + (curr.price * curr.quantity), 0);
    this.deliveryPrice = this.totalPrice > 100 ? 0 : 10;
  }

}
