import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ICase } from '../shared/interfaces/case.interface';
import { ICooler } from '../shared/interfaces/cooler.interface';
import { IPartsCount } from '../shared/interfaces/parts-count.interface';
import { IPartsUnion } from '../shared/interfaces/parts-union.interface';
import { ISimpleProduct } from '../shared/interfaces/simple-product.interface';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  constructor(
    private http: HttpClient
  ) { }

  createPart(partData: any, partType: string): Observable<ISimpleProduct> {
    return this.http.post<ISimpleProduct>(environment.api_url + 'parts/create/' + partType, partData, { withCredentials: true });
  }

  editPart(partData: any, partType: string, id: string): Observable<ISimpleProduct> {
    return this.http.put<ISimpleProduct>(environment.api_url + `parts/part/${id}?part=` + partType, partData, { withCredentials: true });
  }

  getCountAll(): Observable<IPartsCount> {
    return this.http.get<IPartsCount>(environment.api_url + 'parts/count/all');
  }

  getItem(partType: string, id: string): Observable<IPartsUnion> {
    return this.http.get<IPartsUnion>(environment.api_url + `parts/part/${partType}/${id}`);
  }

  getItems(query?: string): Observable<any> {
    let url = environment.api_url + 'parts?';
    if (query) {
      url += query;
    }
    return this.http.get(url);
  }

  delete(id: string, partType?: string): Observable<null> {
    return this.http.delete<null>(environment.api_url + `parts/part/${partType}/${id}`, { withCredentials: true });
  }

}
