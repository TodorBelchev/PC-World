import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
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
      tap(() => {
        this.type = this.activatedRoute.snapshot.url[0].path;
      }),
      mergeMap((params) => {
        this.page = params['page'];
        let query = '';

        Object.entries(params).forEach(([k, v]) => {
          query += '&' + k + '=' + v;
        });

        query += `&product=${this.type}`;

        return this.partsService.getItems(query)
      })
    ).subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.log(error.message);
      }
    );
  }

}
