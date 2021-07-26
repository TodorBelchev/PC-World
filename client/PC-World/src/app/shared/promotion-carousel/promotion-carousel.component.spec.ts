import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCarouselComponent } from './promotion-carousel.component';

describe('PromotionCarouselComponent', () => {
  let component: PromotionCarouselComponent;
  let fixture: ComponentFixture<PromotionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
