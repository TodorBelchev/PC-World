import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/interfaces/order.interface';
import { IPromotion } from '../shared/interfaces/promotion.interface';
import { ISalesShare } from '../shared/interfaces/sales-share.interface';
import { ISimpleProduct } from '../shared/interfaces/simple-product.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders(page: number): Observable<{ orders: IOrder[], count: number }> {
    return this.http.get<{ orders: IOrder[], count: number }>(environment.api_url + `orders/admin/${page}`, { withCredentials: true });
  }

  getArchivedOrdersByPage(query: string): Observable<{ orders: IOrder[], count: number }> {
    return this.http.get<{ orders: IOrder[], count: number }>(environment.api_url + `orders/admin/archived` + query, { withCredentials: true });
  }

  saveOrder(order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(environment.api_url + 'orders/admin', order, { withCredentials: true });
  }

  deleteOrder(orderId: string): Observable<null> {
    return this.http.delete<null>(environment.api_url + `orders/admin/${orderId}/delete`, { withCredentials: true });
  }

  createPromotion(promotionData: FormData): Observable<IPromotion> {
    return this.http.post<IPromotion>(environment.api_url + 'promotions', promotionData, { withCredentials: true });
  }

  getCurrentSales(period: string): Observable<{ _id: string, total: number }[]> {
    return this.http.get<{ _id: string, total: number }[]>(environment.api_url + `orders/sales/current?period=` + period, { withCredentials: true });
  }

  getPartsShare(): Observable<ISalesShare> {
    return this.http.get<ISalesShare>(environment.api_url + `orders/sales/share`, { withCredentials: true });
  }

  deletePromo(id: string): Observable<null> {
    return this.http.delete<null>(environment.api_url + '/promotions/' + id, { withCredentials: true });
  }

  addProductToPromo(promoId: string, productId: string): Observable<ISimpleProduct> {
    return this.http.put<ISimpleProduct>(environment.api_url + `promotions/${promoId}`, { addProduct: productId }, { withCredentials: true });
  }

  removeProductFromPromo(promoId: string, productId: string): Observable<ISimpleProduct> {
    return this.http.put<ISimpleProduct>(environment.api_url + `promotions/${promoId}`, { removeProduct: productId }, { withCredentials: true });
  }

}
