import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBarComponent } from './products-bar.component';

describe('ProductsBarComponent', () => {
  let component: ProductsBarComponent;
  let fixture: ComponentFixture<ProductsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
