import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoProductsCarouselComponent } from './promo-products-carousel.component';

describe('PromoProductsCarouselComponent', () => {
  let component: PromoProductsCarouselComponent;
  let fixture: ComponentFixture<PromoProductsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoProductsCarouselComponent ]
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
