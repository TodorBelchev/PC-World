import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-aside-item-price',
  templateUrl: './aside-item-price.component.html',
  styleUrls: ['./aside-item-price.component.scss']
})
export class AsideItemPriceComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  from: number | null = null;
  to: number | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.from = Number(this.route.snapshot.queryParams.priceFrom);
    this.to = Number(this.route.snapshot.queryParams.priceTo);
  }

  onSubmit(): void {
    let queryParams = {};

    if (isNaN(this.from!) === false) {
      queryParams = {
        ...queryParams,
        priceFrom: this.from
      }
    }

    if (isNaN(this.to!) === false) {
      queryParams = {
        ...queryParams,
        priceTo: this.to
      }
    }

    const url = this.route.snapshot.url.map(x => `/${x.path}`).join('');
    this.router.navigate([url], { queryParams })
  }

}
