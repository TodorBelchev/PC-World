import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from 'src/app/parts/parts.service';

import { CreateCoolerComponent } from './create-cooler.component';

describe('CreateCoolersComponent', () => {
  let component: CreateCoolerComponent;
  let fixture: ComponentFixture<CreateCoolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCoolerComponent ],
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
    fixture = TestBed.createComponent(CreateCoolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
