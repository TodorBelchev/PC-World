import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { IPromotion } from 'src/app/shared/interfaces/promotion.interface';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../../admin.service';
import * as authActions from '../../../user/store/auth.actions';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent implements OnInit {
  promotions: IPromotion[] = [];
  showModal: boolean = false;
  promoToDelete: IPromotion | undefined;
  constructor(
    private sharedService: SharedService,
    private adminService: AdminService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.sharedService.getPromotions().subscribe(
      data => {
        this.promotions = data;
      },
      error => {
        console.log(error.error.message);
        this.store.dispatch(authActions.add_message({
          msgType: 'error',
          text: error.error.message || 'Something went wrong. Please try again later!'
        }));
      }
    )
  }

  onDeleteClick(event: IPromotion): void {
    this.promoToDelete = event;
    this.showModal = true;
  }

  onConfirmedDelete(): void {
    this.adminService.deletePromo(this.promoToDelete!._id).subscribe(
      data => {
        this.ngOnInit();
        this.showModal = false;
      },
      error => {
        console.log(error.error.message);
        this.showModal = false;
        this.store.dispatch(authActions.add_message({
          msgType: 'error',
          text: error.error.message || 'Something went wrong. Please try again later.'
        }));
      }
    )
  }

  onCancelClick(): void {
    this.showModal = false;
  }

}
