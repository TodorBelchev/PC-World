import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  constructor(
    private http: HttpClient
  ) { }

  create(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'notebooks/create', data);
  }

  getNotebookById(id: string): Observable<any> {
    return this.http.get(environment.api_url + 'notebooks/' + id);
  }

  getNotebooks(page: number): Observable<any> {
    return this.http.get(environment.api_url + 'notebooks?page=' + page);
  }

  getCount(): Observable<any> {
    return this.http.get(environment.api_url + 'notebooks/count');
  }
}
