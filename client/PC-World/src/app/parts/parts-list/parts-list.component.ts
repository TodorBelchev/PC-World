import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private partsService: PartsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        this.type = this.activatedRoute.snapshot.url[0].path;
        this.page = params['page'];
        let query = '';

        Object.entries(params).forEach(([k, v]) => {
          query += '&' + k + '=' + v;
        });

        query += `&product=${this.type}`;

        this.isLoading = true;
        return this.partsService.getItems(query)
      })).subscribe(
        data => {
          this.products = data.products;
          this.count = data.count;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.message = error.error.message || 'Something went wrong. Please try again later.';
          this.msgType = 'error';
        }
      );
  };
}
