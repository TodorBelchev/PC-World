import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFilter } from 'src/app/shared/store/shared.selectors';
import { NotebookService } from '../notebook.service';
import * as sharedSelectors from '../../shared/store/shared.selectors';
import { AppState } from 'src/app/shared/app-state.interface';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.scss']
})
export class NotebooksListComponent implements OnInit {
  notebooks: [] = [];
  pages: string[] = [];
  page: number = 1;
  filter$: Observable<IFilter | null> = this.store.pipe(select(sharedSelectors.selectFilter));
  constructor(
    private notebookService: NotebookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
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

    this.notebookService.getNotebooks(query).subscribe(
      data => {
        this.notebooks = data;
      },
      error => {
        console.log(error.message);
      }
    );

    // this.filter$.subscribe(
    //   filterData => {

    //     if(filterData?.price.from) {
    //       this.router.navigateByUrl('/notebooks?page=' + this.page + '&filterData=' + JSON.stringify(filterData));
    //     }
    //     // this.notebookService.getNotebooks(this.page, filterData).subscribe(
    //     //   data => {
    //     //     this.notebooks = data;
    //     //   },
    //     //   error => {
    //     //     console.log(error.message);
    //     //   }
    //     // )
    //   },
    //   error => {
    //     console.log(error.message);
    //   }
    // )
  }

}
