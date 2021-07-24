import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { IOrder } from '../../shared/interfaces/order.interface';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: IOrder[] = [];
  userId: string = '';
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.userId = params['id'];
      },
      error => {
        console.log(error.message);
      }
    );

    this.authService.getOrders(this.userId).subscribe(
      orders => {
        this.orders = orders;
      },
      error => {
        console.log(error.message);
      }
    );
  }

}