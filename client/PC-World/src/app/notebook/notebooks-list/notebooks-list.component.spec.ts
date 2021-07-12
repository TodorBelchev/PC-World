import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebooksListComponent } from './notebooks-list.component';

describe('NotebooksListComponent', () => {
  let component: NotebooksListComponent;
  let fixture: ComponentFixture<NotebooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebooksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
