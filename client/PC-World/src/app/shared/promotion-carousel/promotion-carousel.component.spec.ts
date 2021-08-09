import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SharedService } from '../shared.service';

import { PromotionCarouselComponent } from './promotion-carousel.component';

const testStore = {
  dispatch() {}
}
describe('PromotionCarouselComponent', () => {
  let component: PromotionCarouselComponent;
  let fixture: ComponentFixture<PromotionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionCarouselComponent ],
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
    fixture = TestBed.createComponent(PromotionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
