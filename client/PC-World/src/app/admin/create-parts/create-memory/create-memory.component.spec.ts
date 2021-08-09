import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from 'src/app/parts/parts.service';

import { CreateMemoryComponent } from './create-memory.component';

describe('CreateMemoryComponent', () => {
  let component: CreateMemoryComponent;
  let fixture: ComponentFixture<CreateMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMemoryComponent ],
      imports: [HttpClientModule, FormsModule],
      providers: [
        PartsService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: 'https://localhost:4200/dashboard/parts/create' } }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
