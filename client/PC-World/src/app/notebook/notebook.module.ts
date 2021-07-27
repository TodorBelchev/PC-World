import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotebooksListComponent } from './notebooks-list/notebooks-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotebookRoutingModule } from './notebook-routing.module';



@NgModule({
  declarations: [
    NotebooksListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    FontAwesomeModule,
    NotebookRoutingModule
  ]
})
export class NotebookModule { }
