import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders(): Observable<any> {
    return this.http.get(environment.api_url + `orders/admin/1`, { withCredentials: true });
  }

  saveOrder(order: IOrder): Observable<any> {
    return this.http.put(environment.api_url + 'orders/admin', order, { withCredentials: true });
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(environment.api_url + `orders/admin/${orderId}/delete`, { withCredentials: true });
  }

}
