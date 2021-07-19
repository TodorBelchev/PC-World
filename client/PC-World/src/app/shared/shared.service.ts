import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createComment(comment: any, _id: string, productName: string): Observable<any> {
    return this.http.post(environment.api_url + 'comments/create', { comment, _id, productName }, { withCredentials: true });
  }

  getCommentsByPage(productId: string, page: number = 1): Observable<any> {
    this.authService.autoAuth();
    return this.http.get(environment.api_url + 'comments?page=' + page + '&modelId=' + productId);
  }

  getCommentsCount(productId: string): Observable<any> {
    return this.http.get(environment.api_url + 'comments/count?modelId=' + productId);
  }
}
