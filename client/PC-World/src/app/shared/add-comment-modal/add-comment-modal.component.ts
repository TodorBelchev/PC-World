import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/auth/user.interface';
import { AppState } from '../app-state.interface';
import { SharedService } from '../shared.service';
import * as authSelectors from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.scss']
})
export class AddCommentModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() product: { _id: string, productName: string } = { _id: '', productName: '' };
  commentForm: FormGroup;
  user$: Observable<IUser | null> = this.store.pipe(select(authSelectors.selectUser));
  user: IUser | null = null;
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private store: Store<AppState>

  ) {
    this.commentForm = this.fb.group({
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ],
      rating: [
        '',
        [
          Validators.required
        ]
      ],
      firstName: [
        '',
        [
          Validators.required
        ]
      ],
      lastName: [
        '',
        [
          Validators.required
        ]
      ]
    })
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.user = user;
    },
      error => {
        console.log(error.message);
      });
  }

  onSubmit(): void {
    const reqBody = this.commentForm.value;
    if (this.user?.firstName && this.user.lastName) {
      reqBody.firstName = this.user.firstName;
      reqBody.lastName = this.user.lastName;
    }

    this.sharedService.createComment(reqBody, this.product._id, this.product.productName).subscribe(
      data => {
        this.showModal = false;
        this.closeModal.emit(true);
      },
      error => {
        console.log(error.message);
      }
    )
  }

  onContainerClick(): void {
    this.showModal = false;
    this.closeModal.emit(true);
  }

}
