import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { NotebookService } from '../notebook.service';

import { NotebooksListComponent } from './notebooks-list.component';

const testStore = {
  select() {
    return of([]);
  },
  dispatch() {}
}
describe('NotebooksListComponent', () => {
  let component: NotebooksListComponent;
  let fixture: ComponentFixture<NotebooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebooksListComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        NotebookService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              brands: "Lenovo",
              page: 1,
              priceFrom: 400,
              priceTo: 2000,
              order: "price-desc"
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
    fixture = TestBed.createComponent(NotebooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
