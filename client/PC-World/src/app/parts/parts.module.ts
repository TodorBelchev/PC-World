import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartsComponent } from './parts/parts.component';
import { RouterModule } from '@angular/router';
import { CreateProcessorComponent } from './create-processor/create-processor.component';
import { CreateVgaComponent } from './create-vga/create-vga.component';
import { CreateMotherboardComponent } from './create-motherboard/create-motherboard.component';
import { CreateMemoryComponent } from './create-memory/create-memory.component';
import { CreateHddComponent } from './create-hdd/create-hdd.component';



@NgModule({
  declarations: [
    CreateComponent,
    PartsComponent,
    CreateProcessorComponent,
    CreateVgaComponent,
    CreateMotherboardComponent,
    CreateMemoryComponent,
    CreateHddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class PartsModule { }
