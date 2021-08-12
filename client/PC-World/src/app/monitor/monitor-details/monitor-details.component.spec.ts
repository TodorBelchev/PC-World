import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MonitorService } from '../monitor.service';

import { MonitorDetailsComponent } from './monitor-details.component';

const testStore = {
  select() {
    return of([]);
  },
  dispatch() {}
}
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
        MonitorService,
        {
          provide: Store,
          useValue: testStore
        }
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
