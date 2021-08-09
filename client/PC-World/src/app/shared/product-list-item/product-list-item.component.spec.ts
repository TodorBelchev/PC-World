import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { HttpMixedContentPipe } from '../pipes/http-mixed-content.pipe';

import { ProductListItemComponent } from './product-list-item.component';

const testStore = {
  dispatch() { }
}
describe('ProductListItemComponent', () => {
  let component: ProductListItemComponent;
  let fixture: ComponentFixture<ProductListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListItemComponent, HttpMixedContentPipe],
      imports: [
        RouterTestingModule
      ],
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
    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;
    component.product = {
      "_id": "60ec0f627d39702e6c0ae881",
      "images": ["http://res.cloudinary.com/dex8g0z5j/image/upload/v1626083168/msfvzasup93gvsycdywl.png", "http://res.cloudinary.com/dex8g0z5j/image/upload/v1626083169/fqnvhtff9lkpz7y82vsy.jpg", "http://res.cloudinary.com/dex8g0z5j/image/upload/v1626083170/wgvwrmrz3vc43hsgug7c.jpg"],
      "brand": "Lenovo",
      "model": "Yoga Slim 7 Pro",
      "processor": "AMD Ryzen™ 7 5800H 3.20 GHz - 4.40 GHz, 16 MB Cache, 8-core",
      "processorCores": 8,
      "memoryType": "DDR4",
      "memoryCapacity": 16,
      "memorySpeed": 3200,
      "storage": "512GB M.2 PCIe NVMe SSD",
      "storageCapacity": 512,
      "graphics": "AMD Radeon™ Graphics",
      "display": "14.0\" 2.8K IPS Glossy 2880x1800 400nits, 90Hz, 100% sRGB, Dolby Vision, Glass", "displaySize": 14,
      "displayResolution": "2880 x 1800",
      "displayRefreshRate": 90,
      "ports": "1 x USB 3.2 Type-A Gen 1, 2 x USB 3.2 Type-C Gen 2",
      "weight": 1.32,
      "color": "gray",
      "dimensions": "31.2 x 22.1 x 1.7 cm",
      "battery": "4-cell, 61Wh", "OS": "Windows 10 Home (64-bit)",
      "category": "business",
      "warranty": 24,
      "price": 1299,
      "quantity": 8,
      "__v": 0,
      "processorBrand": "AMD",
      "processorModel": "Ryzen™ 7 5800H",
      "promoPrice": 1099,
      "currentPrice": 1099,
      "isDeleted": false
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
