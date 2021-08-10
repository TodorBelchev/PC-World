import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SharedService } from '../shared.service';

import { AddCommentModalComponent } from './add-comment-modal.component';

const testStore = {
  select() {
    return of({
      firstName: 'Pesho',
      lastName: 'Petrov',
      _id: '123'
    })
  }
}
describe('AddCommentModalComponent', () => {
  let component: AddCommentModalComponent;
  let fixture: ComponentFixture<AddCommentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCommentModalComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        SharedService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
