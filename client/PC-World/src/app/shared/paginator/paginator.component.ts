import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() productType!: string;
  @Input() count: number | undefined;
  @Input() itemsPerPage: number | undefined;
  pages: string[] = [];
  currentPage: number = 1;
  currentUrl: string = '';
  params: [{ page: number }] = [{ page: 1 }];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.count) {
      this.activatedRoute.queryParams.subscribe(
        params => {
          this.currentUrl = this.router.url.split('?')[0];
          this.params = [{ ...params, page: params['page'] }];
          params['page'] !== undefined ? this.currentPage = params['page'] : '';
          this.pages = Array(Math.ceil(this.count! / this.itemsPerPage!)).fill(1).map((x, i) => (i + 1).toString());
          for (let i = 0; i < this.pages.length; i++) {
            this.params[i + 1] = { ...this.params[i], page: i + 1 }
          }
        }
      );
    }
  }
}
