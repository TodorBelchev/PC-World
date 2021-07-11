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
import { CreateCaseComponent } from './create-case/create-case.component';
import { CreatePowerSupplyComponent } from './create-power-supply/create-power-supply.component';
import { CreateCoolerComponent } from './create-coolers/create-cooler.component';



@NgModule({
  declarations: [
    CreateComponent,
    PartsComponent,
    CreateProcessorComponent,
    CreateVgaComponent,
    CreateMotherboardComponent,
    CreateMemoryComponent,
    CreateHddComponent,
    CreateCaseComponent,
    CreatePowerSupplyComponent,
    CreateCoolerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class PartsModule { }
