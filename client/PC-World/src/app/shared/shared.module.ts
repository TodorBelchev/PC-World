import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AsideComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AsideComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
