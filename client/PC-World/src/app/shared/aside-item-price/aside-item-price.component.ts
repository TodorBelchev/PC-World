import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { filter_success } from '../store/shared.actions';

@Component({
  selector: 'app-aside-item-price',
  templateUrl: './aside-item-price.component.html',
  styleUrls: ['./aside-item-price.component.scss']
})
export class AsideItemPriceComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.store.dispatch(filter_success(this.form.value));
  }
}
