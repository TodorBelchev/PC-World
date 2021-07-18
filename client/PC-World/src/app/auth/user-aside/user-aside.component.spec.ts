import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAsideComponent } from './user-aside.component';

describe('UserAsideComponent', () => {
  let component: UserAsideComponent;
  let fixture: ComponentFixture<UserAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAsideComponent ]
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
