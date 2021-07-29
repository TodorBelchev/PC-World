import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: IOrder[] = [];
  isVisible: boolean = false;
  showModal: boolean = false;
  showSaveModal: boolean = false;
  totalPrice: number | undefined = undefined;
  orderToDelete: IOrder | null = null;
  orderToSave: IOrder | null = null;
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

  onChangeSave(): void {
    this.adminService.saveOrder(this.orderToSave!).subscribe(
      order => {
        this.orderToSave!.completed = true;
        this.showSaveModal = false;
        this.orderToSave = null;
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

  onSaveOrder(order: IOrder): void {
    this.showSaveModal = true;
    this.orderToSave = order;
  }

  onCancelClick(): void {
    this.showModal = false;
    this.orderToDelete = null;
    this.showSaveModal = false;
    this.orderToSave = null;
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
