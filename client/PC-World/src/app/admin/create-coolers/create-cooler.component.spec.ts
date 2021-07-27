import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoolerComponent } from './create-cooler.component';

describe('CreateCoolersComponent', () => {
  let component: CreateCoolerComponent;
  let fixture: ComponentFixture<CreateCoolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCoolerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCoolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
