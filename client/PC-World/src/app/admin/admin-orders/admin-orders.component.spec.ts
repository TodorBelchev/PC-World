import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ProductTypePipe } from 'src/app/shared/pipes/product-type.pipe';
import { AdminService } from '../admin.service';

import { AdminOrdersComponent } from './admin-orders.component';

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;
  let getOrdersSpy: jasmine.Spy;

  beforeEach(async () => {
    const adminService = jasmine.createSpyObj('AdminService', ['getOrders']);
    getOrdersSpy = adminService.getOrders.and.returnValue(of({
      orders: [{
        _id: '123',
        completed: true,
        createdAt: '123',
        deliveryPrice: 1099,
        isVisible: false,
        status: 'pending',
        totalPrice: 1099,
        guest: {
          firstName: 'John',
          lastName: 'Doe'
        },
        products: [
          {
            _id: '123',
            onModel: 'Notebook',
            product: {
              _id: '123',
              brand: 'Lenovo',
              model: 'Yoga',
              images: ['']
            },
            purchasePrice: 1099,
            purchaseQuantity: 1,
            type: 'notebooks'
          }
        ]
      }],
      count: 1
    }));
    await TestBed.configureTestingModule({
      declarations: [
        AdminOrdersComponent,
        ProductTypePipe
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: AdminService,
          useValue: adminService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show 0 offers', fakeAsync(() => {
  //   getOrdersSpy.and.returnValue(of({
  //     orders: [],
  //     count: 0
  //   }));
  //   fixture.detectChanges();
  //   tick();
  //   fixture.detectChanges();
  //   console.log(fixture.nativeElement);
    
  //   expect(fixture.nativeElement.querySelector('p')).toContain('No active orders.');
  // }));
});
