import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotebookService } from '../notebook.service';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.scss']
})
export class NotebooksListComponent implements OnInit {
  notebooks: [] = [];
  pages: string[] = [];
  page: number = 1;
  count: number = 0;
  constructor(
    private notebookService: NotebookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }

    let query = '';

    this.activatedRoute.queryParams.subscribe(params => {
      Object.entries(params).forEach(([k, v]) => {
        query += '&' + k + '=' + v;
      });
      this.page = params['page'];
    });

    this.notebookService.getItems(query).subscribe(
      data => {
        this.notebooks = data;
      },
      error => {
        console.log(error.message);
      }
    );

    this.notebookService.getCount(query).subscribe(
      data => {
        this.count = data.count;
      },
      error => {
        console.log(error.error.message);
      }
    )

  }

}
