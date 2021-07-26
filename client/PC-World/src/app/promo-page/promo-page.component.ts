import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotebookService } from '../notebook/notebook.service';
import { INotebook } from '../shared/interfaces/notebook.interface';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-promo-page',
  templateUrl: './promo-page.component.html',
  styleUrls: ['./promo-page.component.scss']
})
export class PromoPageComponent implements OnInit {
  productType: string = '';
  promoId: string = '';
  products: INotebook[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService

  ) { }

  ngOnInit(): void {
    this.productType = this.activatedRoute.snapshot.params['productType'];
    this.promoId = this.activatedRoute.snapshot.params['id'];

    
    this.activatedRoute.queryParams.subscribe(params => {
      let query = '';
      Object.entries(params).forEach(([k, v]) => {
        query += '&' + k + '=' + v;
      });

      this.sharedService.getPromotionById(this.promoId, query).subscribe(
        data => {
          this.products = data.products;
        },
        error => {
          console.log(error);
        }
      );
    });

  }

}
