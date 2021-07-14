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
  constructor(
    private notebookService: NotebookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.activatedRoute.queryParams.subscribe(params => {
      this.page = params['page'];
    });
    this.notebookService.getNotebooks(this.page).subscribe(
      data => {
        this.notebooks = data;
      },
      error => {
        console.log(error.message);
      }
    );
  }

}
