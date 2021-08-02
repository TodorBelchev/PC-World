import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/app-state.interface';
import { SharedService } from '../shared.service';

import * as authActions from '../../user/store/auth.actions';

@Component({
  selector: 'app-promotion-carousel',
  templateUrl: './promotion-carousel.component.html',
  styleUrls: ['./promotion-carousel.component.scss']
})
export class PromotionCarouselComponent implements OnInit, OnDestroy {
  promotions: { _id: string, productType: string, image: string }[] = [];
  currentIndex: number = 0;
  interval: any;
  isLoading: boolean = false;
  error: string | undefined;
  constructor(
    private sharedService: SharedService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.sharedService.getPromotions().subscribe(
      data => {
        this.promotions = data;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.error = 'Something went wrong. Please try again later.';
        this.store.dispatch(authActions.add_message({ msgType: 'error', text: this.error }));
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
