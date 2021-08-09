import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PartsService } from 'src/app/parts/parts.service';

import { CreateComponent } from './create.component';

describe('CreateComponentComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        PartsService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: 'https://localhost:4200/dashboard/parts/create'
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
