import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorComponent } from './create-monitor.component';

describe('CreateMonitorComponent', () => {
  let component: CreateMonitorComponent;
  let fixture: ComponentFixture<CreateMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
