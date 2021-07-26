import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

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
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.getPromoProducts().subscribe(
      data => {
        this.promotions = data;
        this.currentProducts = this.promotions.slice(0, 5);
      },
      error => {
        console.log(error.message);
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
