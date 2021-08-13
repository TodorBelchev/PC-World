import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsBarComponent } from './products-bar/products-bar.component';
import { ScrollTopBtnComponent } from './scroll-top-btn/scroll-top-btn.component';
import { AboutComponent } from './about/about.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PromoPageComponent } from './promo-page/promo-page.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductsBarComponent,
    ScrollTopBtnComponent,
    AboutComponent,
    TermsAndConditionsComponent,
    HomeComponent,
    PromoPageComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductsBarComponent,
    ScrollTopBtnComponent,
    AboutComponent,
    TermsAndConditionsComponent,
    HomeComponent,
    PromoPageComponent
  ]
})
export class CoreModule { }
