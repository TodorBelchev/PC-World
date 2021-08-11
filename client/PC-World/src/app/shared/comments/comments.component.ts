import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../interfaces/app-state.interface';
import { IComment } from '../interfaces/comment';
import { SharedService } from '../shared.service';
import * as authActions from '../../user/store/auth.actions';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  commentsCount: number = 0;
  comments: IComment[] = [];
  @Input() productId: string = '';
  commentsSub: Subscription = new Subscription;
  newCommentsSub: Subscription = new Subscription;
  constructor(
    private sharedService: SharedService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.newCommentsSub = this.sharedService.commentCreated.subscribe(comment => {
      this.comments = [comment, ...this.comments];
    });
    this.fetchComments();
  }

  ngOnDestroy(): void {
    this.commentsSub.unsubscribe();
    this.newCommentsSub.unsubscribe();
  }

  fetchComments(): void {
    this.sharedService.getCommentsCount(this.productId).subscribe(
      data => {
        this.commentsCount = data.count;
      },
      error => {
        console.log(error.error.message);
        this.store.dispatch(authActions.add_message({
          msgType: 'error',
          text: error.error.message || 'Something went wrong. Please try again later.'
        }));
      }
    );

    this.sharedService.getCommentsByPage(this.productId).subscribe(
      comments => {
        this.comments = comments;
      },
      error => {
        console.log(error.message);
        this.store.dispatch(authActions.add_message({
          msgType: 'error',
          text: error.error.message || 'Something went wrong. Please try again later.'
        }));
      }
    );
  }

  loadMore(): void {
    const page = this.comments.length / 5;
    this.sharedService.getCommentsByPage(this.productId, page + 1).subscribe(
      comments => {
        this.comments = [...this.comments, ...comments];
      },
      error => {
        console.log(error.error.message);
        this.store.dispatch(authActions.add_message({
          msgType: 'error',
          text: error.error.message || 'Something went wrong. Please try again later.'
        }));
      }
    )
  }

}
