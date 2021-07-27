import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { MonitorService } from 'src/app/monitor/monitor.service';
import { NotebookService } from 'src/app/notebook/notebook.service';
import { PartsService } from 'src/app/parts/parts.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() productType!: string;
  pages: string[] = [];
  currentPage: number = 1;
  currentUrl: string = '';
  params: [{ page: number }] = [{ page: 1 }];
  service: NotebookService | MonitorService | PartsService | undefined;
  constructor(
    private router: Router,
    private notebookService: NotebookService,
    private monitorService: MonitorService,
    private partsService: PartsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        tap(() => {
          if (this.productType === 'notebook') {
            this.service = this.notebookService;
          } else if (this.productType === 'monitor') {
            this.service = this.monitorService;
          } else {
            this.service = this.partsService;
          }
          this.currentUrl = this.router.url.split('?')[0];
        }),
        mergeMap((params) => {
          this.params = [{ ...params, page: params['page'] }];
          params['page'] !== undefined ? this.currentPage = params['page'] : '';

          let countQuery = '';

          for (const [k, v] of Object.entries(params)) {
            countQuery += `${k}=${v}&`;
          }
          countQuery += `&product=${this.productType}`;

          return this.service!.getCount(countQuery)
        })
      )
      .subscribe(
        data => {
          this.pages = Array(Math.ceil(data.count / 16)).fill(1).map((x, i) => (i + 1).toString());
          for (let i = 0; i < this.pages.length; i++) {
            this.params[i + 1] = { ...this.params[i], page: i + 1 }
          }
        },
        error => {
          console.log(error.message);
        }
      );
  }

}
