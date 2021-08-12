import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { PartsService } from '../parts.service';

import { PartDetailsComponent } from './part-details.component';

const testStore = {
  select() {
    return of([]);
  },
  dispatch() {}
}
describe('PartDetailsComponent', () => {
  let component: PartDetailsComponent;
  let fixture: ComponentFixture<PartDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartDetailsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        PartsService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
