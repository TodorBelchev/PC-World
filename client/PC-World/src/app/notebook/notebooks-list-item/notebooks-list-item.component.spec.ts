import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebooksListItemComponent } from './notebooks-list-item.component';

describe('NotebooksListItemComponent', () => {
  let component: NotebooksListItemComponent;
  let fixture: ComponentFixture<NotebooksListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotebooksListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebooksListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
