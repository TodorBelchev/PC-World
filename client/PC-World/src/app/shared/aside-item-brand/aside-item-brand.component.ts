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
  isLoading: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    let component = '';
    let query = '?';
    const url = this.router.routerState.snapshot.url.split('?')[0];
    if (url === '/monitors') {
      component = 'monitors';
    } else if (url === '/notebooks') {
      component = 'notebooks';
    } else {
      const part = url.split('/')[2];
      component = `parts/${part}`;
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
          this.isLoading = true;
          return this.sharedService.getBrands(component, query)
        }
      )
    ).subscribe(
      data => {
        this.brands = data.brands;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
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

    if (this.selectedBrands.length == 0) {
      delete queryParams.brands;
    }

    queryParams.page = 1;
    const url = this.router.routerState.snapshot.url.split('?')[0];
    this.router.navigate([url], { queryParams });
  }

}
