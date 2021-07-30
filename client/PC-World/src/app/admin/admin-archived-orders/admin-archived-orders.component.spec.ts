import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArchivedOrdersComponent } from './admin-archived-orders.component';

describe('AdminArchivedOrdersComponent', () => {
  let component: AdminArchivedOrdersComponent;
  let fixture: ComponentFixture<AdminArchivedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArchivedOrdersComponent ]
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
