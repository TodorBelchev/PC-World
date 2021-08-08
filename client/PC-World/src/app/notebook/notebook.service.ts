import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { INotebook } from '../shared/interfaces/notebook.interface';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  constructor(
    private http: HttpClient
  ) { }

  create(data: any): Observable<INotebook> {
    return this.http.post<INotebook>(environment.api_url + 'notebooks/create', data, { withCredentials: true });
  }

  edit(id: string, data: any): Observable<INotebook> {
    return this.http.put<INotebook>(environment.api_url + 'notebooks/' + id, data, { withCredentials: true });
  }

  getById(id: string): Observable<INotebook> {
    return this.http.get<INotebook>(environment.api_url + 'notebooks/' + id);
  }

  getItems(query?: any): Observable<{ products: INotebook[], count: number }> {
    let url = environment.api_url + 'notebooks?';
    if (query) {
      url += query;
    }
    return this.http.get<{ products: INotebook[], count: number }>(url);
  }

  delete(id: string): Observable<null> {
    return this.http.delete<null>(environment.api_url + 'notebooks/' + id, { withCredentials: true });
  }
}
