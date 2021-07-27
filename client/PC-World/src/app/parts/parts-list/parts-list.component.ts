import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private partsService: PartsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      tap(() => {
        this.type = this.activatedRoute.snapshot.url[1].path;
        if (this.type === 'memories') {
          this.type = 'memory';
        } else {
          this.type = this.type.substring(0, this.type.length - 1);
        }
      }),
      mergeMap((params) => {
        this.page = params['page'];
        let query = '';

        Object.entries(params).forEach(([k, v]) => {
          query += '&' + k + '=' + v;
        });

        query += `&product=${this.type}&page=${this.page}`;

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
