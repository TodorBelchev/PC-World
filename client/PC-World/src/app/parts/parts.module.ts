import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponentComponent } from './create-component/create-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateComponentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PartsModule { }
