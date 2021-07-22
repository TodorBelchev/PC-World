import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/auth/order.interface';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];
  isVisible: boolean = false;
  showModal: boolean = false;
  totalPrice: number | undefined = undefined;
  orderToDelete: IOrder | null = null;
  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminService.getOrders().subscribe(
      orders => {
        this.orders = orders;
      },
      error => {
        console.log(error.message);
      }
    );

  }

  onEditClick(order: IOrder): void {
    this.router.navigateByUrl(`/dashboard/orders/${order._id}/edit`);
  }

  onChangeStatus(order: IOrder): void {
    const index = this.orders.indexOf(order);
    order.status == 'pending' ? order.status = 'sent' : order.status == 'sent' ? order.status = 'completed' : order.status == 'completed' ? order.status = 'pending' : '';
    this.orders.splice(index, 1, order);
  }

  onChangeSave(order: IOrder): void {
    this.adminService.saveOrder(order).subscribe(
      order => {

      },
      error => {
        console.log(error.message);
      }
    )
  }

  onDeleteOrder(order: IOrder): void {
    this.showModal = true;
    this.orderToDelete = order;
  }

  onCancelClick(): void {
    this.showModal = false;
    this.orderToDelete = null;
  }

  onConfirmedDelete(): void {
    if (this.orderToDelete) {
      this.adminService.deleteOrder(this.orderToDelete?._id).subscribe(
        data => {
          const index = this.orders.indexOf(this.orderToDelete!);
          this.orders.splice(index, 1);
          this.showModal = false;
          this.orderToDelete = null;
        },
        error => {
          this.showModal = false;
          this.orderToDelete = null;
          console.log(error.message);
        }
      )
    }
  }

}
