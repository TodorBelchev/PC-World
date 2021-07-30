import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '../../shared/interfaces/order.interface';
import { UserService } from '../user.service';
import { IProduct } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-warranties',
  templateUrl: './warranties.component.html',
  styleUrls: ['./warranties.component.scss']
})
export class WarrantiesComponent implements OnInit {
  count: number = 0;
  page: number = 1;
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
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.activatedRoute.queryParamMap.subscribe(
      params => {
        this.page = Number(params.get('page')) || 1;
        this.userService.getWarranties(this.page).subscribe(
          data => {
            this.warranties = data.warranties;
            this.count = data.count;
          },
          error => {
            console.log(error.message);
          }
        )
      }
    )

  }

}
