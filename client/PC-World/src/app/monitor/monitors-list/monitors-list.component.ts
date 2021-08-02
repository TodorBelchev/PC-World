import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MonitorService } from '../monitor.service';

@Component({
  selector: 'app-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss']
})
export class MonitorsListComponent implements OnInit {
  monitors: [] = [];
  page: number = 1;
  count: number = 0;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  constructor(
    private monitorService: MonitorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    let query = '';

    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        Object.entries(params).forEach(([k, v]) => {
          query += '&' + k + '=' + v;
        });
        this.page = params['page'];

        this.isLoading = true;
        return this.monitorService.getItems(query);
      })).subscribe(
        data => {
          this.monitors = data.products;
          this.count = data.count;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.message = 'Something went wrong. Please try again later.';
          this.msgType = 'error';
        }
      );;
  }

}
