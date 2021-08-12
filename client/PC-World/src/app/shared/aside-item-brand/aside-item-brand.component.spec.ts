import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AsideItemBrandComponent } from './aside-item-brand.component';

const testStore = {
  select() {
    return of([]);
  },
  dispatch() {}
}
describe('AsideItemBrandComponent', () => {
  let component: AsideItemBrandComponent;
  let fixture: ComponentFixture<AsideItemBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideItemBrandComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { 
              url: 'https://localhost:4200/notebooks?page=1' 
            },
            queryParams: of({
              page: 1
            })
          }
        },
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideItemBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
