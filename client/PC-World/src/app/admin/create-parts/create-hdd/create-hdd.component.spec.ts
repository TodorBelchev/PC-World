import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHddComponent } from './create-hdd.component';

describe('CreateHddComponent', () => {
  let component: CreateHddComponent;
  let fixture: ComponentFixture<CreateHddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
