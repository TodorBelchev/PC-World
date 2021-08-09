import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AdminService } from '../admin.service';

import { AdminArchivedOrdersComponent } from './admin-archived-orders.component';

describe('AdminArchivedOrdersComponent', () => {
  let component: AdminArchivedOrdersComponent;
  let fixture: ComponentFixture<AdminArchivedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminArchivedOrdersComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        AdminService,
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
});
