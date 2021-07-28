import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { IComment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  commentCreated = new Subject<IComment>();
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createComment(comment: any, _id: string, productName: string): Observable<any> {
    return this.http.post(environment.api_url + 'comments/create', { comment, _id, productName }, { withCredentials: true })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err.message);
        }),
        tap(comment => {
          this.commentCreated.next(comment as IComment);
        })
      )
  }

  getCommentsByPage(productId: string, page: number = 1): Observable<any> {
    this.authService.autoAuth();
    return this.http.get(environment.api_url + 'comments?page=' + page + '&modelId=' + productId);
  }

  getCommentsCount(productId: string): Observable<any> {
    return this.http.get(environment.api_url + 'comments/count?modelId=' + productId);
  }

  getPromotions(): Observable<any> {
    return this.http.get(environment.api_url + 'promotions');
  }

  getPromotionById(id: string, query: string): Observable<any> {
    return this.http.get(environment.api_url + `promotions/${id}?${query}`);
  }

  getPromoProducts(): Observable<any> {
    return this.http.get(environment.api_url + 'promotions/products')
  }
}
