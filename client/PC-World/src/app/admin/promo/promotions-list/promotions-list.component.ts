import { Component, OnInit } from '@angular/core';
import { IPromotion } from 'src/app/shared/interfaces/promotion.interface';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../../admin.service';

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
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.sharedService.getPromotions().subscribe(
      data => {
        this.promotions = data;
      },
      error => {
        console.log(error.error.message);
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
      }
    )
  }

  onCancelClick(): void {
    this.showModal = false;
  }

}
