import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IMonitor } from '../shared/interfaces/monitor.interface';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(
    private http: HttpClient
  ) { }

  create(data: any): Observable<IMonitor> {
    return this.http.post<IMonitor>(environment.api_url + 'monitors/create', data, { withCredentials: true });
  }

  edit(id: string, data: any): Observable<IMonitor> {
    return this.http.put<IMonitor>(environment.api_url + 'monitors/' + id, data, { withCredentials: true });
  }

  getItems(query?: string): Observable<{ products: IMonitor[], count: number }> {
    let url = environment.api_url + 'monitors?';
    if (query) {
      url += query;
    }
    return this.http.get<{ products: IMonitor[], count: number }>(url);
  }

  getItem(id: string): Observable<IMonitor> {
    return this.http.get<IMonitor>(environment.api_url + 'monitors/' + id);
  }

  delete(id: string): Observable<null> {
    return this.http.delete<null>(environment.api_url + 'monitors/' + id, { withCredentials: true });
  }
}
