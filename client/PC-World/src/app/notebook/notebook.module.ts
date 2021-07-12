import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotebookComponent } from './create-notebook/create-notebook.component';
import { FormsModule } from '@angular/forms';
import { NotebooksListComponent } from './notebooks-list/notebooks-list.component';
import { NotebooksListItemComponent } from './notebooks-list-item/notebooks-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CreateNotebookComponent,
    NotebooksListComponent,
    NotebooksListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ]
})
export class NotebookModule { }
