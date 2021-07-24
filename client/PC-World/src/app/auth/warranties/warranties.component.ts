import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IOrder } from '../../shared/interfaces/order.interface';
import { IProduct } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-warranties',
  templateUrl: './warranties.component.html',
  styleUrls: ['./warranties.component.scss']
})
export class WarrantiesComponent implements OnInit {
  warranties: {
    _id: string,
    purchaseQuantity: number,
    warranty: number,
    user: string,
    product: IProduct,
    onModel: string,
    purchasePrice: number,
    order: IOrder,
    createdAt: number
  }[] = [];
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getWarranties().subscribe(
      warranties => {
        this.warranties = warranties;
      },
      error => {
        console.log(error.message);
      }
    )
  }

}
