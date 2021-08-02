import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
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

    this.activatedRoute.queryParams.pipe(
      switchMap(
        params => {
          Object.entries(params).forEach(([k, v]) => {
            query += '&' + k + '=' + v;
          });
          this.page = params['page'];
          this.isLoading = true;
          return this.notebookService.getItems(query);
        })).subscribe(
          data => {
            this.notebooks = data.products;
            this.count = data.count;
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            this.message = 'Something went wrong. Please try again later.';
            this.msgType = 'error';
          }
        );
  }

}
