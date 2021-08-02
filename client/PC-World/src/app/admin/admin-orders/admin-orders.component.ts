import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: IOrder[] = [];
  count: number = 0;
  page: number = 1;
  isLoading: boolean = false;
  isVisible: boolean = false;
  showModal: boolean = false;
  showSaveModal: boolean = false;
  totalPrice: number | undefined = undefined;
  orderToDelete: IOrder | null = null;
  orderToSave: IOrder | null = null;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        this.page = params['page'] || 1;
        this.isLoading = true;
        return this.adminService.getOrders(this.page)
      })
    ).subscribe(
      data => {
        this.orders = data.orders;
        this.count = data.count;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
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
    this.isLoading = true;
    this.showSaveModal = false;
    this.adminService.saveOrder(this.orderToSave!).subscribe(
      order => {
        if (order.completed) {
          const index = this.orders.indexOf(this.orderToSave!);
          this.orders.splice(index, 1);
          this.count--;
          this.orderToSave!.completed = true;
          this.orderToSave = null;
          this.ngOnInit();
        }
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
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
      this.showModal = false;
      this.isLoading = true;
      this.adminService.deleteOrder(this.orderToDelete?._id).subscribe(
        data => {
          const index = this.orders.indexOf(this.orderToDelete!);
          this.orders.splice(index, 1);
          this.orderToDelete = null;
          this.isLoading = false;
          this.count--;
          this.ngOnInit();
        },
        error => {
          this.orderToDelete = null;
          this.isLoading = false;
          console.log(error.message);
        }
      )
    }
  }

}
