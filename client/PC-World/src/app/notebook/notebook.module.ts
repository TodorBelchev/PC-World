import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotebookComponent } from './create-notebook/create-notebook.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateNotebookComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class NotebookModule { }
