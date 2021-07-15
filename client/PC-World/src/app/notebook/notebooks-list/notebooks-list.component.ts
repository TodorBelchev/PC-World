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

  onFilter(event: any): void {
    console.log(event);
    
  }

}
