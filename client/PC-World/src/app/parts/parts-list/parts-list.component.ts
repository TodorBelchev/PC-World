import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.scss']
})
export class PartsListComponent implements OnInit {
  products: [] = [];
  type: string = '';
  page: number = 1;
  count: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = this.activatedRoute.snapshot.url[0].path;
      this.page = params['page'];
      let query = '';

      Object.entries(params).forEach(([k, v]) => {
        query += '&' + k + '=' + v;
      });

      query += `&product=${this.type}`;

      this.partsService.getItems(query).subscribe(
        products => {
          this.products = products;
        },
        error => {
          console.log(error.message);
        }
      );

      this.partsService.getCount(query).subscribe(
        data => {
          this.count = data.count;
        },
        error => {
          console.log(error.message);
        }
      );
    });
  }

}
