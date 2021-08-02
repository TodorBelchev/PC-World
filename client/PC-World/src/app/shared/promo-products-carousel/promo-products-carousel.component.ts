import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/app-state.interface';
import { SharedService } from '../shared.service';
import * as authActions from '../../user/store/auth.actions';

@Component({
  selector: 'app-promo-products-carousel',
  templateUrl: './promo-products-carousel.component.html',
  styleUrls: ['./promo-products-carousel.component.scss']
})
export class PromoProductsCarouselComponent implements OnInit {
  promotions: { _id: string, productType: string, images: string[], promoPrice: number, price: number, brand: string, model: string }[] = [];
  currentProducts: { _id: string, productType: string, images: string[], promoPrice: number, price: number, brand: string, model: string }[] = [];
  dotsArr: string[] = ['', '', '', '', '', ''];
  index: number = 0;
  dotIndex: number = 0;
  isLoading: boolean = false;
  error: string | undefined;
  constructor(
    private sharedService: SharedService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.sharedService.getPromoProducts().subscribe(
      data => {
        this.promotions = data;
        this.currentProducts = this.promotions.slice(0, 5);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.error = 'Something went wrong. Please try again later.';
        this.store.dispatch(authActions.add_message({ msgType: 'error', text: this.error }));
      }
    );
  }

  onNextClick(): void {
    this.index++;
    if (this.index % 5 === 0) {
      this.dotIndex++;
    }
    this.currentProducts = this.promotions.slice(0 + this.index, 5 + this.index);
  }

  onPrevClick(): void {
    this.index--;
    if (this.index % 5 === 0) {
      this.dotIndex--;
    }
    this.currentProducts = this.promotions.slice(0 + this.index, 5 + this.index);
  }

  onDotClick(index: number): void {
    this.index = index * 5;
    this.dotIndex = index;
    this.currentProducts = this.promotions.slice(0 + this.index, 5 + this.index);
  }

}
