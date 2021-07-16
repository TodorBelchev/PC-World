import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient
  ) { }

  createComment(comment: any, _id: string, productName: string): Observable<any> {
    return this.http.post(environment.api_url + 'comments/create', { comment, _id, productName });
  }
}
