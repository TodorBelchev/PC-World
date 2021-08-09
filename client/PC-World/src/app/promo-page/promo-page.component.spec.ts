import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SharedService } from '../shared/shared.service';

import { PromoPageComponent } from './promo-page.component';

describe('PromoPageComponent', () => {
  let component: PromoPageComponent;
  let fixture: ComponentFixture<PromoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromoPageComponent],
      imports: [
        HttpClientModule
      ],
      providers: [
        SharedService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: 'https://localhost:4200/promotions/notebooks/60fd482a0fe051369cd8d5f3?order=price-desc&page=1',
              params: {
                productType: 'notebooks',
                id: '123'
              }
            },
            queryParams: of({
              order: 'price-desc',
              page: 1
            })
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
