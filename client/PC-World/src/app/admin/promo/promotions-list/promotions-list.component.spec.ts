import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../../admin.service';

import { PromotionsListComponent } from './promotions-list.component';

const testStore = {
  select() {
    return of([]);
  },
  dispatch() {}
}
describe('PromotionsListComponent', () => {
  let component: PromotionsListComponent;
  let fixture: ComponentFixture<PromotionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsListComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        AdminService,
        SharedService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
