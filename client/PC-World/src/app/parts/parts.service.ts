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

  createPart(partData: any, partType: string): Observable<object> {
    return this.http.post(environment.api_url + 'parts/create/' + partType, partData, { withCredentials: true });
  }
}
