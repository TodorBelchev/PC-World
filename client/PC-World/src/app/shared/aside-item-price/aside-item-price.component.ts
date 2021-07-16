import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.interface';

import { filter_success } from '../store/shared.actions';
import { selectFilter } from '../store/shared.selectors';

@Component({
  selector: 'app-aside-item-price',
  templateUrl: './aside-item-price.component.html',
  styleUrls: ['./aside-item-price.component.scss']
})
export class AsideItemPriceComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  selectFilter$ = this.store.select(selectFilter);
  from: number | null = null;
  to: number | null = null;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.from = Number(this.route.snapshot.queryParams.priceFrom);
    this.to = Number(this.route.snapshot.queryParams.priceTo);
  }

  onSubmit(): void {
    this.store.dispatch(filter_success(this.form.value));
    let query = '';

    this.selectFilter$.subscribe(filterData => {
      if (filterData!.price.from) {
        query += '&priceFrom=' + filterData!.price.from;
      }

      if (filterData!.price.to) {
        query += '&priceTo=' + filterData!.price.to;
      }
      this.router.navigateByUrl('/notebooks?page=1' + query);
    })

  }
}
