import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(
    private http: HttpClient
  ) { }

  create(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'monitors/create', data, { withCredentials: true });
  }

  edit(id: string, data: any) {
    return this.http.put(environment.api_url + 'monitors/' + id, data, { withCredentials: true });
  }

  getItems(query?: string): Observable<any> {
    let url = environment.api_url + 'monitors?';
    if (query) {
      url += query;
    }
    return this.http.get(url);
  }

  getItem(id: string): Observable<any> {
    return this.http.get(environment.api_url + 'monitors/' + id);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(environment.api_url + 'monitors/' + id, { withCredentials: true });
  }
}
