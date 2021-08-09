import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SharedService } from '../shared.service';

import { PromoProductsCarouselComponent } from './promo-products-carousel.component';

describe('PromoProductsCarouselComponent', () => {
  let component: PromoProductsCarouselComponent;
  let fixture: ComponentFixture<PromoProductsCarouselComponent>;

  const testStore = {
    dispatch() { }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromoProductsCarouselComponent],
      imports: [
        HttpClientModule
      ],
      providers: [
        SharedService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoProductsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
