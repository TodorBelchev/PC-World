import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorService } from 'src/app/monitor/monitor.service';
import { NotebookService } from 'src/app/notebook/notebook.service';

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
  constructor(
    private router: Router,
    private notebookService: NotebookService,
    private monitorService: MonitorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const page = params['page'];
      this.params = [{ ...params, page: params['page'] }];
      if (page !== undefined) {
        this.currentPage = params['page'];
      }
      this.currentUrl = this.router.url.split('?')[0];
      let service = undefined;

      if (this.productType === 'notebook') {
        service = this.notebookService;
      }

      if (this.productType === 'monitor') {
        service = this.monitorService;
      }

      let query = '';
      let countQuery = '';

      this.activatedRoute.queryParams.subscribe(urlParams => {
        for (const [k, v] of Object.entries(urlParams)) {
          query += `${k}=${v}&`;
          countQuery += `${k}=${v}&`;
        }

      });

      service!.getCount(countQuery).subscribe(
        data => {
          this.pages = Array(Math.ceil(data.count / 16)).fill(1).map((x, i) => (i + 1).toString());
          for (let i = 0; i < this.pages.length; i++) {
            this.params[i + 1] = { ...this.params[i], page: i + 1 }
          }
        },
        error => {
          console.log(error.message);
        }
      )
    });
  }

}
