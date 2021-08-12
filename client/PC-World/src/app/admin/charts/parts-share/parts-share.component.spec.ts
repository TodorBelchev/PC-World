import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AdminService } from '../../admin.service';

import { PartsShareComponent } from './parts-share.component';

const testStore = {
  select() {
    return of([]);
  },
  dispatch() {}
}
describe('PartsShareComponent', () => {
  let component: PartsShareComponent;
  let fixture: ComponentFixture<PartsShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsShareComponent ],
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
    fixture = TestBed.createComponent(PartsShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
