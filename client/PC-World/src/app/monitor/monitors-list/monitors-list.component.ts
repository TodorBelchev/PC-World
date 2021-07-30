import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

    this.activatedRoute.queryParams.subscribe(params => {
      Object.entries(params).forEach(([k, v]) => {
        query += '&' + k + '=' + v;
      });
      this.page = params['page'];

      this.monitorService.getItems(query).subscribe(
        data => {
          this.monitors = data;
        },
        error => {
          console.log(error.message);
        }
      );

      this.monitorService.getCount(query).subscribe(
        data => {
          this.count = data.count;
        },
        error => {
          console.log(error.message);
        }
      )
    });
  }

}
