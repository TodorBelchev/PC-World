import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RouterModule } from '@angular/router';
import { AsideItemPriceComponent } from './aside-item-price/aside-item-price.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromShared from './store/shared.reducer';



@NgModule({
  declarations: [
    AsideComponent,
    PaginatorComponent,
    AsideItemPriceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    StoreModule.forFeature(fromShared.featureKey, fromShared.sharedReducer)
  ],
  exports: [
    AsideComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
