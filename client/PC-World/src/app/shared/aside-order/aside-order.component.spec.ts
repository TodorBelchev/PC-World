import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideOrderComponent } from './aside-order.component';

describe('AsideOrderComponent', () => {
  let component: AsideOrderComponent;
  let fixture: ComponentFixture<AsideOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
