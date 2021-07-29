import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePowerSupplyComponent } from './create-power-supply.component';

describe('CreatePowerSupplyComponent', () => {
  let component: CreatePowerSupplyComponent;
  let fixture: ComponentFixture<CreatePowerSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePowerSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePowerSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
