import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMonitorComponent } from './create-monitor/create-monitor.component';
import { FormsModule } from '@angular/forms';
import { MonitorsListComponent } from './monitors-list/monitors-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CreateMonitorComponent,
    MonitorsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class MonitorModule { }
