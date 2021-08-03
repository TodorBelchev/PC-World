import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminAsideComponent } from './admin-aside/admin-aside.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ProductsComponent } from './products/products.component';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';
import { CreateMonitorComponent } from './create-parts/create-monitor/create-monitor.component';
import { CreateNotebookComponent } from './create-parts/create-notebook/create-notebook.component';
import { CreateComponent } from './create-parts/create/create.component';
import { CreateCaseComponent } from './create-parts/create-case/create-case.component';
import { CreateCoolerComponent } from './create-parts/create-coolers/create-cooler.component';
import { CreateHddComponent } from './create-parts/create-hdd/create-hdd.component';
import { CreateMotherboardComponent } from './create-parts/create-motherboard/create-motherboard.component';
import { CreatePowerSupplyComponent } from './create-parts/create-power-supply/create-power-supply.component';
import { CreateProcessorComponent } from './create-parts/create-processor/create-processor.component';
import { CreateVgaComponent } from './create-parts/create-vga/create-vga.component';
import { CreateMemoryComponent } from './create-parts/create-memory/create-memory.component';
import { SalesVolumeComponent } from './charts/sales-volume/sales-volume.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PartsShareComponent } from './charts/parts-share/parts-share.component';
import { AdminArchivedOrdersComponent } from './admin-archived-orders/admin-archived-orders.component';
import { AddRemoveProductComponent } from './promo/add-remove-product/add-remove-product.component';
import { PromotionsListComponent } from './promo/promotions-list/promotions-list.component';
import { PromotionsComponent } from './promo/promotions/promotions.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AdminAsideComponent,
    AdminOrdersComponent,
    ProductsComponent,
    PromotionsComponent,
    CreatePromotionComponent,
    CreateMonitorComponent,
    CreateNotebookComponent,
    CreateComponent,
    CreateCaseComponent,
    CreateCoolerComponent,
    CreateHddComponent,
    CreateMotherboardComponent,
    CreatePowerSupplyComponent,
    CreateProcessorComponent,
    CreateVgaComponent,
    CreateMemoryComponent,
    StatisticsComponent,
    SalesVolumeComponent,
    PartsShareComponent,
    AdminArchivedOrdersComponent,
    PromotionsListComponent,
    AddRemoveProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
