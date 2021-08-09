import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { ControlsComponent } from './controls.component';

const testStore = {
  dispatch() { },
  select() {
    return of({
      firstName: 'Pesho',
      lastName: 'Petrov',
      _id: '123',
      email: 'pesho@abv.bg'
    })
  }
}
describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlsComponent],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    component.product = {
      "_id": "60ec0f627d39702e6c0ae881",
      "images": ["http://res.cloudinary.com/dex8g0z5j/image/upload/v1626083168/msfvzasup93gvsycdywl.png", "http://res.cloudinary.com/dex8g0z5j/image/upload/v1626083169/fqnvhtff9lkpz7y82vsy.jpg", "http://res.cloudinary.com/dex8g0z5j/image/upload/v1626083170/wgvwrmrz3vc43hsgug7c.jpg"],
      "brand": "Lenovo",
      "model": "Yoga Slim 7 Pro",
      "price": 1299,
      "quantity": 8,
      "promoPrice": 1099
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
