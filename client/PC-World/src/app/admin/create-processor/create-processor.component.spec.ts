import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcessorComponent } from './create-processor.component';

describe('CreateProcessorComponent', () => {
  let component: CreateProcessorComponent;
  let fixture: ComponentFixture<CreateProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProcessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
