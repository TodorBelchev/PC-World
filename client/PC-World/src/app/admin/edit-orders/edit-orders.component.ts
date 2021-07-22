import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/auth/order.interface';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.scss']
})
export class EditOrdersComponent implements OnInit {
  order: IOrder | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    // this.adminService.getOrderById(this.activatedRoute.snapshot.params.id).subscribe(
    //   order => {
    //     console.log(order);
    //     this.order = order;
    //   },
    //   error => {
    //     console.log(error.message);
    //   }
    // )
  }

}
