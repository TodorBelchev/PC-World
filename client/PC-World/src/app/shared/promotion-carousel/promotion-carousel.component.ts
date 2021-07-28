import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-promotion-carousel',
  templateUrl: './promotion-carousel.component.html',
  styleUrls: ['./promotion-carousel.component.scss']
})
export class PromotionCarouselComponent implements OnInit, OnDestroy {
  promotions: { _id: string, productType: string, image: string }[] = [];
  currentIndex: number = 0;
  interval: any;
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.getPromotions().subscribe(
      data => {
        this.promotions = data;
      },
      error => {
        console.log(error.message);
      }
    );
    this.interval = setInterval(() => {
      this.currentIndex === this.promotions.length - 1 ? this.currentIndex = 0 : this.currentIndex++;
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  onNextClick(): void {
    this.currentIndex === this.promotions.length - 1 ? this.currentIndex = 0 : this.currentIndex++;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.currentIndex === this.promotions.length - 1 ? this.currentIndex = 0 : this.currentIndex++;
    }, 5000);
  }

  onPrevClick(): void {
    this.currentIndex === 0 ? this.currentIndex = this.promotions.length - 1 : this.currentIndex--;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.currentIndex === this.promotions.length - 1 ? this.currentIndex = 0 : this.currentIndex++;
    }, 5000);
  }

  onDotClick(index: number): void {
    this.currentIndex = index;
  }

}
