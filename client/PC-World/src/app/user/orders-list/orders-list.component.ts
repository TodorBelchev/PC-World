import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '../../shared/interfaces/order.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: IOrder[] = [];
  userId: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
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

    this.userService.getOrders(this.userId).subscribe(
      orders => {
        this.orders = orders;
      },
      error => {
        console.log(error.message);
      }
    );
  }

}