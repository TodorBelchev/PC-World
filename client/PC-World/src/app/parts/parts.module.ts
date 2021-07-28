import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartsComponent } from './parts/parts.component';
import { RouterModule } from '@angular/router';
import { PartsListComponent } from './parts-list/parts-list.component';
import { SharedModule } from '../shared/shared.module';
import { PartsRoutingModule } from './parts-routing.module';
import { PartDetailsComponent } from './part-details/part-details.component';



@NgModule({
  declarations: [
    PartsComponent,
    PartsListComponent,
    PartDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    PartsRoutingModule
  ]
})
export class PartsModule { }
