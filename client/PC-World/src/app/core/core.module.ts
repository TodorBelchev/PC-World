import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsBarComponent } from './products-bar/products-bar.component';
import { ScrollTopBtnComponent } from './scroll-top-btn/scroll-top-btn.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductsBarComponent,
    ScrollTopBtnComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductsBarComponent,
    ScrollTopBtnComponent
  ]
})
export class CoreModule { }
