import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsShareComponent } from './parts-share.component';

describe('PartsShareComponent', () => {
  let component: PartsShareComponent;
  let fixture: ComponentFixture<PartsShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
