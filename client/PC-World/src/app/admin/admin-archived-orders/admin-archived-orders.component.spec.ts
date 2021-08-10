import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should fetch data', async () => {
    const adminService = fixture.debugElement.injector.get(AdminService);
    const spy = spyOn(adminService, 'getArchivedOrdersByPage');
    fixture.whenStable().then(() => {
      expect(component.count).toBe(2);
    });
  });

  it('should show correct order id', async () => {
    const adminService = fixture.debugElement.injector.get(AdminService);
    const spy = spyOn(adminService, 'getArchivedOrdersByPage');
    fixture.whenStable().then(() => {
      let result = fixture.nativeElement.querySelector('.order:first-child() .order-title').textContent;
      expect(result).toContain('123');
    });
  });

  it('should show correct guest name', async () => {
    const adminService = fixture.debugElement.injector.get(AdminService);
    const spy = spyOn(adminService, 'getArchivedOrdersByPage');
    fixture.whenStable().then(() => {
      let result = fixture.nativeElement.querySelector('.order:nth-child(2) .order-title').textContent;
      expect(result).toContain('John Doe');
    });
  });

  it('should show correct status', async () => {
    const adminService = fixture.debugElement.injector.get(AdminService);
    const spy = spyOn(adminService, 'getArchivedOrdersByPage');
    fixture.whenStable().then(() => {
      let result = fixture.nativeElement.querySelector('.order-status').textContent;
      expect(result).toContain('completed');
    });
  });

  it('should show no orders message', async () => {
    const adminService = fixture.debugElement.injector.get(AdminService);
    const spy = spyOn(adminService, 'getArchivedOrdersByPage').and.returnValue(
      of({
        orders: [],
        count: 0
      }));
    fixture.whenStable().then(() => {
      let result = fixture.nativeElement.querySelector('.order').textContent;
      expect(result).toContain('No orders for selected period.');
    });
  });

  afterAll(() => {
    fixture.destroy();
  });
});
