import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service';

import { WarrantiesComponent } from './warranties.component';

describe('WarrantiesComponent', () => {
  let component: WarrantiesComponent;
  let fixture: ComponentFixture<WarrantiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantiesComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        UserService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
