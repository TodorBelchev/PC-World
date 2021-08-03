import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aside-order',
  templateUrl: './aside-order.component.html',
  styleUrls: ['./aside-order.component.scss']
})
export class AsideOrderComponent implements OnInit {
  selected: string | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        if (params['order']) {
          this.selected = params['order'];
        }
      }
    )
  }

  onSelectChange(event: any): void {
    this.selected = event.target.value;
    let queryParams = this.activatedRoute.snapshot.queryParams;
    queryParams = {
      ...queryParams,
      order: this.selected
    }
    queryParams.page = 1;
    const url = this.router.routerState.snapshot.url.split('?')[0];
    this.router.navigate([url], { queryParams });
  }

}
