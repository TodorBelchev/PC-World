import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonitorsListComponent } from './monitors-list/monitors-list.component';
import { SharedModule } from '../shared/shared.module';
import { MonitorRoutingModule } from './monitor-routing.module';



@NgModule({
  declarations: [
    MonitorsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
