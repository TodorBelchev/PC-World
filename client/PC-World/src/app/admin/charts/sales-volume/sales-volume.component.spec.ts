import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AdminService } from '../../admin.service';

import { SalesVolumeComponent } from './sales-volume.component';

const testStore = {
  select() {
    return of([]);
  },
  dispatch() {}
}
describe('SalesVolumeComponent', () => {
  let component: SalesVolumeComponent;
  let fixture: ComponentFixture<SalesVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesVolumeComponent ],
      imports: [HttpClientModule],
      providers:[
        AdminService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
