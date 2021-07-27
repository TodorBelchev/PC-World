import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminAsideComponent } from './admin-aside/admin-aside.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMonitorComponent } from './create-monitor/create-monitor.component';
import { CreateNotebookComponent } from './create-notebook/create-notebook.component';
import { CreateComponent } from './create/create.component';
import { CreateCaseComponent } from './create-case/create-case.component';
import { CreateCoolerComponent } from './create-coolers/create-cooler.component';
import { CreateHddComponent } from './create-hdd/create-hdd.component';
import { CreateMotherboardComponent } from './create-motherboard/create-motherboard.component';
import { CreatePowerSupplyComponent } from './create-power-supply/create-power-supply.component';
import { CreateProcessorComponent } from './create-processor/create-processor.component';
import { CreateVgaComponent } from './create-vga/create-vga.component';
import { CreateMemoryComponent } from './create-memory/create-memory.component';



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
    CreateMemoryComponent
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
