import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminAsideComponent } from './admin-aside/admin-aside.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../shared/shared.module';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromotionsComponent } from './promotions/promotions.component';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AdminAsideComponent,
    OrdersComponent,
    EditOrdersComponent,
    ProductsComponent,
    PromotionsComponent,
    CreatePromotionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
