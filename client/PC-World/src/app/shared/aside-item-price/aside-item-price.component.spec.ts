import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideItemPriceComponent } from './aside-item-price.component';

describe('AsideItemPriceComponent', () => {
  let component: AsideItemPriceComponent;
  let fixture: ComponentFixture<AsideItemPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideItemPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideItemPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
