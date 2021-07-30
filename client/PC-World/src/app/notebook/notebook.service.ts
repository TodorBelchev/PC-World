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
    return this.http.post(environment.api_url + 'notebooks/create', data, { withCredentials: true });
  }

  edit(id: string, data: any): Observable<any> {
    return this.http.put(environment.api_url + 'notebooks/' + id, data, { withCredentials: true });
  }

  getById(id: string): Observable<any> {
    return this.http.get(environment.api_url + 'notebooks/' + id);
  }

  getItems(query?: any): Observable<any> {
    let url = environment.api_url + 'notebooks?';
    if (query) {
      url += query;
    }
    return this.http.get(url);
  }

  // getCount(query: string): Observable<any> {
  //   return this.http.get(environment.api_url + 'notebooks/count?' + query);
  // }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.api_url + 'notebooks/' + id, { withCredentials: true });
  }
}
