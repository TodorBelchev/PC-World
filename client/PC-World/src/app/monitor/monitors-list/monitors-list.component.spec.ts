import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MonitorService } from '../monitor.service';

import { MonitorsListComponent } from './monitors-list.component';

const testStore = {
  select() {
    return of([]);
  },
  dispatch() {}
}
describe('MonitorsListComponent', () => {
  let component: MonitorsListComponent;
  let fixture: ComponentFixture<MonitorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitorsListComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        MonitorService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              brands: "Lenovo",
              page: 1,
              priceFrom: 100,
              priceTo: 250,
              order: "price-desc"
            })
          }
        },
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
