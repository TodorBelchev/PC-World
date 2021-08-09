import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpMixedContentPipe } from 'src/app/shared/pipes/http-mixed-content.pipe';
import { ProductTypePipe } from 'src/app/shared/pipes/product-type.pipe';

import { OrdersListItemComponent } from './orders-list-item.component';

describe('OrdersListItemComponent', () => {
  let component: OrdersListItemComponent;
  let fixture: ComponentFixture<OrdersListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrdersListItemComponent,
        ProductTypePipe,
        HttpMixedContentPipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersListItemComponent);
    component = fixture.componentInstance;
    component.order = {
      _id: '123',
      completed: true,
      createdAt: '01/01/2021',
      deliveryPrice: 0,
      isVisible: false,
      products: [{
        purchasePrice: 1099,
        purchaseQuantity: 1,
        type: 'notebooks',
        _id: '',
        product: {
          _id: '',
          images: [''],
          brand: '',
          model: '',
        },
        onModel: '',
      }],
      status: 'completed',
      totalPrice: 1099
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
