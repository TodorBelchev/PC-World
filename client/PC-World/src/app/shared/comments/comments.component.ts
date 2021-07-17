import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app-state.interface';
import { IComment } from '../comment';
import { SharedService } from '../shared.service';
import { commentCreated } from '../store/shared.selectors';
import * as sharedActions from '../store/shared.actions';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  commentsCount: number = 0;
  comments: IComment[] = [];
  @Input() productId: string = '';
  commentCreated$: Observable<any> = this.store.select(commentCreated);

  constructor(
    private sharedService: SharedService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.commentCreated$.subscribe(
      comment => {
        if (comment._id !== '') {
          this.comments = [comment, ...this.comments];
          this.store.dispatch(sharedActions.comment_created(<IComment>{ _id: '', modelId: '', body: { comment: '', firstName: '', lastName: '', rating: 0 }, createdAt: '' }));
        }
      },
      error => {
        console.log(error.message);
      }
    )

    this.fetchComments();

  }

  fetchComments(): void {
    this.sharedService.getCommentsCount(this.productId).subscribe(
      data => {
        this.commentsCount = data.count;
      },
      error => {
        console.log(error.message);
      }
    );

    this.sharedService.getCommentsByPage(this.productId).subscribe(
      comments => {
        this.comments = comments;
      },
      error => {
        console.log(error.message);
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
        console.log(error.message);
      }
    )
  }

}
