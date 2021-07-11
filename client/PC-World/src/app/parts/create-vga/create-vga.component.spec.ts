import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVgaComponent } from './create-vga.component';

describe('CreateVgaComponent', () => {
  let component: CreateVgaComponent;
  let fixture: ComponentFixture<CreateVgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVgaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
