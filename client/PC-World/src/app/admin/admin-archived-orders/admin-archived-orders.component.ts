import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  noOrders: boolean = false;
  isLoading: boolean = false;
  orderToDelete: IOrder | null = null;
  startDate: string | undefined;
  endDate: string | undefined;
  error: string | undefined;
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

    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        for (const [k, v] of Object.entries(params)) {
          query += `${k}=${v}&`;
          countQuery += `${k}=${v}&`;
        }
        this.page = params['page'] || 1;
        this.startDate = params['startDate'] || undefined;
        this.endDate = params['endDate'] || undefined;
        if (!this.startDate || !this.endDate) {
          return of({ orders: [], count: 0 });
        }
        this.isLoading = true;
        return this.adminService.getArchivedOrdersByPage(query)
      })
    ).subscribe(
      data => {
        this.isLoading = false;
        this.orders = data.orders;
        this.count = data.count;
        if (this.orders.length == 0) {
          this.noOrders = true;
        } else {
          this.noOrders = false;
        }
      },
      error => {
        this.isLoading = false;
        console.log(error.error.message);
      }
    );
  }

  onSubmit(): void {
    const urlParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    this.startDate = this.form.value.startDate;
    this.endDate = this.form.value.endDate;

    urlParams.startDate = this.startDate;
    urlParams.endDate = this.endDate;
    urlParams.page = 1;
    if (!urlParams.startDate || !urlParams.endDate) {
      this.error = 'Start and end date are required!';
      return;
    }

    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: urlParams });
  }

  onDeleteOrder(order: IOrder): void {
    this.orderToDelete = order;
    this.showModal = true;
  }

  onConfirmedDelete(): void {
    if (this.orderToDelete) {
      this.isLoading = true;
      this.showModal = false;
      this.adminService.deleteOrder(this.orderToDelete?._id).subscribe(
        data => {
          const index = this.orders.indexOf(this.orderToDelete!);
          this.orders.splice(index, 1);
          this.orderToDelete = null;
          this.isLoading = false;
        },
        error => {
          this.orderToDelete = null;
          this.isLoading = false;
          console.log(error.message);
        }
      );
      this.ngOnInit();
    }
  }

  onCancelClick(): void {
    this.orderToDelete = null;
    this.showModal = false;
  }

}
