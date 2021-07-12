import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMonitorComponent } from './create-monitor/create-monitor.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateMonitorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MonitorModule { }
