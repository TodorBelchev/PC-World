import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveProductComponent } from './add-remove-product.component';

describe('AddRemoveProductComponent', () => {
  let component: AddRemoveProductComponent;
  let fixture: ComponentFixture<AddRemoveProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRemoveProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
