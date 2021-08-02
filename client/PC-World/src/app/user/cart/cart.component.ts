import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import { NotebookService } from 'src/app/notebook/notebook.service';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import * as authActions from '../store/auth.actions';
import * as authSelectors from '../store/auth.selectors';
import { first } from 'rxjs/operators';
import { IUser } from '../../shared/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { PartsService } from 'src/app/parts/parts.service';
import { MonitorService } from 'src/app/monitor/monitor.service';
import { IProduct } from 'src/app/shared/interfaces/simple-product.interface';

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
  user: IUser | undefined;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  orderForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private notebookService: NotebookService,
    private partsService: PartsService,
    private monitorService: MonitorService,
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
        this.isLoading = true;
        this.products = this.fetchCart(cart);
      },
      error => {
        console.log(error.message);
      }
    );

    this.userService.loadProfile().subscribe(
      user => {
        this.user = user;
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
    this.isLoading = true;
    this.userService.placeOrder(orderData).subscribe(
      data => {
        this.isLoading = false;
        this.store.dispatch(authActions.empty_cart());
        this.store.dispatch(authActions.add_message({
          text: 'Order successful',
          msgType: 'success'
        }));
        if (this.user) {
          this.router.navigateByUrl('/users/' + this.user._id + '/orders');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error => {
        this.isLoading = false;
        this.message = 'Something went wrong. Please try again later.';
        this.msgType = 'error';
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
    if (cart.length == 0 ) {
      this.isLoading = false;
      return [];
    }
    cart.forEach((x: { _id: string, productType: string }, index) => {
      if (x.productType === 'notebooks') {
        this.notebookService.getById(x._id).subscribe(
          notebook => {
            this.isLoading = false;
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
            this.message = 'Something went wrong. Please try again later.';
            this.msgType = 'error';
            this.isLoading = false;
          }
        );
      } else if (x.productType === 'monitors') {
        this.monitorService.getItem(x._id).subscribe(
          monitor => {
            this.isLoading = false;
            fetchedCart.push({
              _id: monitor._id,
              images: monitor.images,
              brand: monitor.brand,
              model: monitor.model,
              price: monitor.price,
              promoPrice: monitor.promoPrice,
              type: x.productType,
              quantity: cart[index].quantity,
              warranty: monitor.warranty
            });
            monitor.promoPrice !== 0 ? this.totalPrice += monitor.promoPrice * cart[index].quantity : this.totalPrice += monitor.price * cart[index].quantity;
            this.deliveryPrice = this.totalPrice > 100 ? 0 : 10;
          },
          error => {
            this.message = 'Something went wrong. Please try again later.';
            this.msgType = 'error';
            this.isLoading = false;
          }
        )
      } else if (x.productType !== '') {
        
        this.partsService.getItem(x.productType, x._id).subscribe(
          part => {
            this.isLoading = false;
            fetchedCart.push({
              _id: part._id,
              images: part.images,
              brand: part.brand,
              model: part.model,
              price: part.price,
              promoPrice: part.promoPrice,
              type: x.productType,
              quantity: cart[index].quantity,
              warranty: part.warranty,
              urlPrefix: `/components`
            });
            part.promoPrice !== 0 ? this.totalPrice += part.promoPrice * cart[index].quantity : this.totalPrice += part.price * cart[index].quantity;
            this.deliveryPrice = this.totalPrice > 100 ? 0 : 10;
          },
          error => {
            this.message = 'Something went wrong. Please try again later.';
            this.msgType = 'error';
            this.isLoading = false;
          }
        );
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
