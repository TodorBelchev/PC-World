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

  getArchivedOrdersByPage(query: string): Observable<any> {
    return this.http.get(environment.api_url + `orders/admin/archived` + query, { withCredentials: true });
  }

  getArchivedOrdersCount(query: string): Observable<any> {
    return this.http.get(environment.api_url + `orders/admin/archived/count` + query, { withCredentials: true });
  }

  saveOrder(order: IOrder): Observable<any> {
    return this.http.put(environment.api_url + 'orders/admin', order, { withCredentials: true });
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(environment.api_url + `orders/admin/${orderId}/delete`, { withCredentials: true });
  }

  createPromotion(promotionData: FormData): Observable<any> {
    return this.http.post(environment.api_url + 'promotions', promotionData, { withCredentials: true });
  }

  getCurrentSales(period: string): Observable<any> {
    return this.http.get(environment.api_url + `orders/sales/current?period=` + period, { withCredentials: true });
  }

  getPartsShare(): Observable<any> {
    return this.http.get(environment.api_url + `orders/sales/share`, { withCredentials: true });
  }

}
