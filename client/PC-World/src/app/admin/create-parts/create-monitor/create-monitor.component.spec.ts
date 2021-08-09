import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PartsService } from 'src/app/parts/parts.service';

import { CreateMonitorComponent } from './create-monitor.component';

describe('CreateMonitorComponent', () => {
  let component: CreateMonitorComponent;
  let fixture: ComponentFixture<CreateMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMonitorComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        PartsService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: 'https://localhost:4200/dashboard/monitors/create' } }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
