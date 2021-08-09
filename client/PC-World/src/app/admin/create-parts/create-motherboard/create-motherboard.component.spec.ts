import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartsService } from 'src/app/parts/parts.service';

import { CreateMotherboardComponent } from './create-motherboard.component';

describe('CreateMotherboardComponent', () => {
  let component: CreateMotherboardComponent;
  let fixture: ComponentFixture<CreateMotherboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMotherboardComponent ],
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
    fixture = TestBed.createComponent(CreateMotherboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
