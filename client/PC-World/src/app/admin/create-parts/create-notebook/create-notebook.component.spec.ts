import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PartsService } from 'src/app/parts/parts.service';

import { CreateNotebookComponent } from './create-notebook.component';

describe('CreateNotebookComponent', () => {
  let component: CreateNotebookComponent;
  let fixture: ComponentFixture<CreateNotebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNotebookComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        PartsService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: 'https://localhost:4200/dashboard/notebooks/create' } }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
