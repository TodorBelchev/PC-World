import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotebookService } from 'src/app/notebook/notebook.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  pages: string[] = [];
  currentPage: number = 1;
  currentUrl: string = '';
  constructor(
    private router: Router,
    private notebookService: NotebookService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const page = params['page'];
      if (page !== undefined) {
        this.currentPage = params['page'];
      }
    });
    this.currentUrl = this.router.url.split('?')[0];
    let service = undefined;

    if (this.currentUrl === '/notebooks') {
      service = this.notebookService
    }
    service!.getCount().subscribe(
      data => {
        this.pages = Array(Math.ceil(data.count / 16)).fill(1).map((x,i) => (i + 1).toString());
      },
      error => {
        console.log(error.message);
      }
    )
  }

}
