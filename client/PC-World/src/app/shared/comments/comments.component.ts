import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../interfaces/app-state.interface';
import { IComment } from '../comment';
import { SharedService } from '../shared.service';


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
    this.sharedService.commentCreated.subscribe(comment => {
      this.comments = [comment, ...this.comments];
    });
    this.fetchComments();
  }

  ngOnDestroy(): void {
    this.commentsSub.unsubscribe();
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
