import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  constructor(
    private http: HttpClient
  ) { }

  createPart(part: any): Observable<object> {
    return this.http.post(environment.api_url + 'parts/create', part, { withCredentials: true });
  }
}
