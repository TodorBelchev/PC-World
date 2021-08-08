import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  count: number = 0;
  page: number = 1;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.userId = this.activatedRoute.snapshot.url[0].path;
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.page = params['page'] || 1;
        this.isLoading = true;
        this.userService.getOrders(this.userId, this.page).subscribe(
          data => {
            this.orders = data.orders;
            this.count = data.count;
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            this.message = error.error.message || 'Something went wrong. Please try again later.';
            this.msgType = 'error';
          }
        );
      });
  }

}