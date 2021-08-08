import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { AppState } from '../interfaces/app-state.interface';
import { SharedService } from '../shared.service';
import * as authSelectors from '../../user/store/auth.selectors';
import { IComment } from '../comment';
import { ISimpleProduct } from '../interfaces/simple-product.interface';

@Component({
  selector: 'app-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.scss']
})
export class AddCommentModalComponent implements OnInit, OnDestroy {
  @Input() showModal: boolean = false;
  @Input() product: ISimpleProduct | undefined;
  @Input() productName: string | undefined;
  @Output() commentCreated: EventEmitter<any> = new EventEmitter();
  @Output() hideModal: EventEmitter<any> = new EventEmitter();
  commentForm: FormGroup;
  user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);
  user: IUser | null = null;
  userSub: Subscription = new Subscription;
  formError: string | undefined;
  isLoading: boolean = false;
  message: string | undefined;
  msgType: string | undefined;
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private store: Store<AppState>

  ) {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(10)]],
      rating: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.userSub = this.user$.subscribe(
      user => {
        this.user = user;
        this.commentForm.patchValue(user!);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSubmit(): void {
    const reqBody = this.commentForm.value;
    if (this.commentForm.get('firstName')?.hasError('required')
      || this.commentForm.get('lastName')?.hasError('required')
      || this.commentForm.get('comment')?.hasError('required')
      || this.commentForm.get('rating')?.hasError('required')
    ) {
      this.formError = 'All fields are required!';
      return;
    }

    this.isLoading = true;
    this.sharedService.createComment(reqBody, this.product!._id, this.productName!).subscribe(
      data => {
        const comment: IComment = {
          _id: data._id,
          body: data.body,
          createdAt: data.createdAt,
          modelId: data.modelId
        }
        this.isLoading = false;
        this.commentCreated.emit(comment);
      },
      error => {
        this.isLoading = false;
        this.message = error.error.message || 'Something went wrong. Please try again later.';
        this.msgType = 'error';
      }
    )
  }

  onContainerClick(event: any): void {
    if (event.target.className == 'new-modal') {
      this.showModal = false;
      this.hideModal.emit(true);
    }
  }

  onCancelClick(): void {
    this.showModal = false;
    this.hideModal.emit(true);
  }
}
