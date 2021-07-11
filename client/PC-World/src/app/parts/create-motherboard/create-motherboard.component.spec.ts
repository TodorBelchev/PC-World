import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMotherboardComponent } from './create-motherboard.component';

describe('CreateMotherboardComponent', () => {
  let component: CreateMotherboardComponent;
  let fixture: ComponentFixture<CreateMotherboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMotherboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMotherboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
