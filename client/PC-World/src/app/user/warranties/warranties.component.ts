import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/interfaces/order.interface';
import { UserService } from '../user.service';
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getWarranties().subscribe(
      warranties => {
        this.warranties = warranties;
      },
      error => {
        console.log(error.message);
      }
    )
  }

}
