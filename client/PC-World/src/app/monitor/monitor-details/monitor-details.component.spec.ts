import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MonitorService } from '../monitor.service';

import { MonitorDetailsComponent } from './monitor-details.component';

describe('MonitorDetailsComponent', () => {
  let component: MonitorDetailsComponent;
  let fixture: ComponentFixture<MonitorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorDetailsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        MonitorService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
