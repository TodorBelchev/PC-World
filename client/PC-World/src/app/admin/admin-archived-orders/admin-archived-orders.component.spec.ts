import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductTypePipe } from 'src/app/shared/pipes/product-type.pipe';
import { AdminService } from '../admin.service';
import { AdminServiceStub } from '../admin.service.mock';

import { AdminArchivedOrdersComponent } from './admin-archived-orders.component';

describe('AdminArchivedOrdersComponent', () => {
  let component: AdminArchivedOrdersComponent;
  let fixture: ComponentFixture<AdminArchivedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminArchivedOrdersComponent,
        ProductTypePipe
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        {
          provide: AdminService,
          useClass: AdminServiceStub
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              startDate: "2021-08-01",
              endDate: '2021-08-01',
              page: 1
            })
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArchivedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(component.count).toBe(1);
    });
  }));

  it('should show correct order id', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let result = fixture.nativeElement.querySelector('.order-title:nth-child(1)').textContent;
      expect(result).toContain('123');
    });
  }));

  it('should show correct guest name', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let result = fixture.nativeElement.querySelector('.order-title:nth-child(2)').textContent;
      expect(result).toContain('John Doe');
    });
  }));

  it('should show correct status', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let result = fixture.nativeElement.querySelector('.order-status').textContent;
      expect(result).toContain('completed');
    });
  }));

  // it('should show no orders message', waitForAsync(() => {
  //   let adminService = fixture.debugElement.injector.get(AdminService);
  //   spyOn(adminService, 'getArchivedOrdersByPage').and.returnValue(of({
  //     orders: [],
  //     count: 0
  //   }));
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     let result = fixture.nativeElement.querySelector('.order').textContent;
  //     expect(result).toContain('No orders for selected period.');
  //   });
  // }));
});
