import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { UserAsideComponent } from './user-aside.component';

const testStore = {
  select() {
    return of(null)
  }
}
describe('UserAsideComponent', () => {
  let component: UserAsideComponent;
  let fixture: ComponentFixture<UserAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAsideComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: Store, useValue: testStore
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
