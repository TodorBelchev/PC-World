import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { AddRemoveProductComponent } from './add-remove-product.component';

describe('AddRemoveProductComponent', () => {
  let component: AddRemoveProductComponent;
  let fixture: ComponentFixture<AddRemoveProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRemoveProductComponent],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [
        AdminService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
