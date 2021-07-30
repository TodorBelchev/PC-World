import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-archived-orders',
  templateUrl: './admin-archived-orders.component.html',
  styleUrls: ['./admin-archived-orders.component.scss']
})
export class AdminArchivedOrdersComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  orders: IOrder[] = [];
  showModal: boolean = false;
  orderToDelete: IOrder | null = null;
  startDate: string | undefined;
  endDate: string | undefined;
  page: number = 1;
  count: number = 0;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    let query = '?';
    let countQuery = '?';

    this.activatedRoute.queryParams.subscribe(params => {
      for (const [k, v] of Object.entries(params)) {
        query += `${k}=${v}&`;
        countQuery += `${k}=${v}&`;
      }
      this.page = params['page'] || 1;
      this.startDate = params['startDate'] || undefined;
      this.endDate = params['endDate'] || undefined;

      if (query != '?') {
        this.adminService.getArchivedOrdersByPage(query).subscribe(
          data => {
            this.orders = data;
          },
          error => {
            console.log(error.error.message);
          }
        );

        this.adminService.getArchivedOrdersCount(countQuery).subscribe(
          data => {
            this.count = data.count;
          },
          error => {
            console.log(error.error.message);
          }
        )
      }

    });
  }

  onSubmit(): void {
    const urlParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    this.startDate = this.form.value.startDate;
    this.endDate = this.form.value.endDate;

    urlParams.startDate = this.startDate;
    urlParams.endDate = this.endDate;
    urlParams.page = this.page;

    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: urlParams });
  }

  onDeleteOrder(order: IOrder): void {
    this.orderToDelete = order;
    this.showModal = true;
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

  onCancelClick(): void {
    this.orderToDelete = null;
    this.showModal = false;
  }

}
