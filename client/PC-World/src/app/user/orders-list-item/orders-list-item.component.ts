import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from '../../shared/interfaces/order.interface';

@Component({
  selector: 'app-orders-list-item',
  templateUrl: './orders-list-item.component.html',
  styleUrls: ['./orders-list-item.component.scss']
})
export class OrdersListItemComponent implements OnInit {
  @Input() order: IOrder | null = null;
  isVisible: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(): void {
    this.isVisible = !this.isVisible;
  }

}
