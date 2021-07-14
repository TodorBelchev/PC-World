import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  count = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  create(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'notebooks/create', data);
  }

  getNotebooks(page: number): Observable<any> {
    return this.http.get(environment.api_url + 'notebooks?page=' + page);
  }

  getCount(): Observable<any> {
    return this.http.get(environment.api_url + 'notebooks/count');
  }
}
