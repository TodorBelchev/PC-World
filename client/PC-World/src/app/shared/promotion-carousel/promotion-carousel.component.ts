import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-promotion-carousel',
  templateUrl: './promotion-carousel.component.html',
  styleUrls: ['./promotion-carousel.component.scss']
})
export class PromotionCarouselComponent implements OnInit {
  promotions: { _id: string, productType: string, image: string }[] = [];
  currentIndex: number = 0;
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
    )
  }

  onNextClick(): void {
    this.currentIndex === this.promotions.length - 1 ? this.currentIndex = 0 : this.currentIndex++;
  }

  onPrevClick(): void {
    this.currentIndex === 0 ? this.currentIndex = this.promotions.length - 1 : this.currentIndex--;
  }

  onDotClick(index: number): void {
    this.currentIndex = index;
  }

}
