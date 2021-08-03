import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-aside-item-brand',
  templateUrl: './aside-item-brand.component.html',
  styleUrls: ['./aside-item-brand.component.scss']
})
export class AsideItemBrandComponent implements OnInit {
  brands: string[] = [];
  selectedBrands: string[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    let component = '';
    let query = '?';
    if (this.activatedRoute.snapshot.routeConfig?.component?.name === 'MonitorsListComponent') {
      component = 'monitors';
    } else if (this.activatedRoute.snapshot.routeConfig?.component?.name === 'NotebooksListComponent') {
      component = 'notebooks';
    } else {
      component = `parts/${this.activatedRoute.snapshot.url[0].path}`;
    }

    this.activatedRoute.queryParams.pipe(
      switchMap(
        params => {
          Object.entries(params).forEach(([k, v]) => {
            query += '&' + k + '=' + v;
            if (k == 'brands') {
              this.selectedBrands = v.split(',');
            }
          });
          return this.sharedService.getBrands(component, query)
        }
      )
    ).subscribe(
      data => {
        this.brands = data.brands;
      },
      error => {
        console.log(error.error.message);
      }
    )
  }

  onCheckClick(event: any): void {
    const isCheck = event.target.checked;
    const checkValue = event.target.value;

    if (isCheck) {
      this.selectedBrands.push(checkValue);
    } else {
      const index = this.selectedBrands.indexOf(checkValue);
      this.selectedBrands.splice(index, 1);
    }

    let queryParams = this.activatedRoute.snapshot.queryParams;
    queryParams = {
      ...queryParams,
      brands: this.selectedBrands.join(',')
    }

    const url = this.router.routerState.snapshot.url.split('?')[0];
    this.router.navigate([url], { queryParams });
  }

}
