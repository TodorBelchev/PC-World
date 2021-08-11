import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/interfaces/app-state.interface';
import { IPromotion } from 'src/app/shared/interfaces/promotion.interface';
import { AdminService } from '../../admin.service';
import * as authActions from '../../../user/store/auth.actions';

@Component({
  selector: 'app-add-remove-product',
  templateUrl: './add-remove-product.component.html',
  styleUrls: ['./add-remove-product.component.scss']
})
export class AddRemoveProductComponent implements OnInit {
  @ViewChild('addForm') addForm!: NgForm;
  @ViewChild('removeForm') removeForm!: NgForm;
  @Input('promo') promo!: IPromotion;
  isLoading: boolean = false;
  constructor(
    private adminService: AdminService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  onAddSubmit(): void {
    this.isLoading = true;
    this.adminService.addProductToPromo(this.promo._id, this.addForm.value).subscribe(
      data => {
        this.isLoading = false;
      },
      error => {
        console.log(error.error.message);
        this.isLoading = false;
        this.store.dispatch(authActions.add_message({
          msgType: 'error',
          text: error.error.message || 'Something went wrong. Please try again later.'
        }));
      }
    )
  }

  onRemoveSubmit(): void {
    this.isLoading = true;
    this.adminService.removeProductFromPromo(this.promo._id, this.removeForm.value).subscribe(
      data => {
        this.isLoading = false;
      },
      error => {
        console.log(error.error.message);
        this.isLoading = false;
        this.store.dispatch(authActions.add_message({
          msgType: 'error',
          text: error.error.message || 'Something went wrong. Please try again later.'
        }));
      }
    )

  }
}
