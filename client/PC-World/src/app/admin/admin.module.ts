import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminAsideComponent } from './admin-aside/admin-aside.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../shared/shared.module';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AdminAsideComponent,
    OrdersComponent,
    EditOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
