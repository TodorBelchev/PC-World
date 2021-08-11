import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { IComment } from './interfaces/comment';
import { IPromotion } from './interfaces/promotion.interface';
import { ISimpleProduct } from './interfaces/simple-product.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  commentCreated = new Subject<IComment>();
  constructor(
    private http: HttpClient
  ) { }

  createComment(comment: any, _id: string, productName: string): Observable<IComment> {
    return this.http.post<IComment>(environment.api_url + 'comments/create', { comment, _id, productName }, { withCredentials: true })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }),
        tap(comment => {
          this.commentCreated.next(comment);
        })
      )
  }

  getCommentsByPage(productId: string, page: number = 1): Observable<IComment[]> {
    return this.http.get<IComment[]>(environment.api_url + 'comments?page=' + page + '&modelId=' + productId);
  }

  getCommentsCount(productId: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(environment.api_url + 'comments/count?modelId=' + productId);
  }

  getPromotions(): Observable<IPromotion[]> {
    return this.http.get<IPromotion[]>(environment.api_url + 'promotions');
  }

  getPromotionById(id: string, query: string): Observable<IPromotion> {
    return this.http.get<IPromotion>(environment.api_url + `promotions/${id}?${query}`);
  }

  getPromoProducts(): Observable<ISimpleProduct[]> {
    return this.http.get<ISimpleProduct[]>(environment.api_url + 'promotions/products');
  }

  getBrands(part: string, query: string): Observable<{ brands: string[] }> {
    return this.http.get<{ brands: string[] }>(environment.api_url + part + `/brands${query}`);
  }
}
