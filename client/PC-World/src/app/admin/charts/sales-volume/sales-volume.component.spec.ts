import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminService } from '../../admin.service';

import { SalesVolumeComponent } from './sales-volume.component';

describe('SalesVolumeComponent', () => {
  let component: SalesVolumeComponent;
  let fixture: ComponentFixture<SalesVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesVolumeComponent ],
      imports: [HttpClientModule],
      providers:[
        AdminService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
