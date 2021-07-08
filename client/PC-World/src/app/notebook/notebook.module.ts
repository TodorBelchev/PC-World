import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotebookComponent } from './create-notebook/create-notebook.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateNotebookComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class NotebookModule { }
