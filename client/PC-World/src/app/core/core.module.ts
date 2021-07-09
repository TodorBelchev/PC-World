import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsBarComponent } from './products-bar/products-bar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductsBarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductsBarComponent
  ]
})
export class CoreModule { }
