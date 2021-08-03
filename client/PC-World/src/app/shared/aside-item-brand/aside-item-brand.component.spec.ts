import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideItemBrandComponent } from './aside-item-brand.component';

describe('AsideItemBrandComponent', () => {
  let component: AsideItemBrandComponent;
  let fixture: ComponentFixture<AsideItemBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideItemBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideItemBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
