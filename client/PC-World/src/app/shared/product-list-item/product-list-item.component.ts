import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: any;
  @Input() type: any;
  constructor() { }

  ngOnInit(): void {
    
  }

  onAddToCart(): void {
    
  }
}
