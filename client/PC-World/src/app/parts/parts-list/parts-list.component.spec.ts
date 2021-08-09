import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PartsService } from '../parts.service';

import { PartsListComponent } from './parts-list.component';

describe('PartsListComponent', () => {
  let component: PartsListComponent;
  let fixture: ComponentFixture<PartsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartsListComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        PartsService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              brands: "Intel®",
              page: 1,
              priceFrom: 400,
              priceTo: 2000,
              order: "price-desc"
            })
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsListComponent);
    component = fixture.componentInstance;
    component.message = '123';
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
