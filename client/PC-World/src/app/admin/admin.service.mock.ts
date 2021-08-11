import { Observable, of } from "rxjs";
import { IOrder } from "../shared/interfaces/order.interface";


export class AdminServiceStub {
    getOrders(page: number): Observable<{ orders: IOrder[], count: number }> {
        return of({
            orders: [],
            count: 0
        })
    }

    getArchivedOrdersByPage(query: string): Observable<{ orders: IOrder[], count: number }> {
        return of({
            orders: [{
                _id: '123',
                completed: true,
                createdAt: '123',
                deliveryPrice: 1099,
                isVisible: false,
                status: 'completed',
                totalPrice: 1099,
                guest: {
                    firstName: 'John',
                    lastName: 'Doe'
                },
                products: [
                    {
                        _id: '123',
                        onModel: 'Notebook',
                        product: {
                            _id: '123',
                            brand: 'Lenovo',
                            model: 'Yoga',
                            images: ['']
                        },
                        purchasePrice: 1099,
                        purchaseQuantity: 1,
                        type: 'notebooks'
                    }
                ]
            }],
            count: 1
        })
    }

    //   saveOrder(order: IOrder): Observable<IOrder> {
    //     return this.http.put<IOrder>(environment.api_url + 'orders/admin', order, { withCredentials: true });
    //   }

    //   deleteOrder(orderId: string): Observable<null> {
    //     return this.http.delete<null>(environment.api_url + `orders/admin/${orderId}/delete`, { withCredentials: true });
    //   }

    //   createPromotion(promotionData: FormData): Observable<IPromotion> {
    //     return this.http.post<IPromotion>(environment.api_url + 'promotions', promotionData, { withCredentials: true });
    //   }

    //   getCurrentSales(period: string): Observable<{ _id: string, total: number }[]> {
    //     return this.http.get<{ _id: string, total: number }[]>(environment.api_url + `orders/sales/current?period=` + period, { withCredentials: true });
    //   }

    //   getPartsShare(): Observable<ISalesShare> {
    //     return this.http.get<ISalesShare>(environment.api_url + `orders/sales/share`, { withCredentials: true });
    //   }

    //   deletePromo(id: string): Observable<null> {
    //     return this.http.delete<null>(environment.api_url + '/promotions/' + id, { withCredentials: true });
    //   }

    //   addProductToPromo(promoId: string, productId: string): Observable<ISimpleProduct> {
    //     return this.http.put<ISimpleProduct>(environment.api_url + `promotions/${promoId}`, { addProduct: productId }, { withCredentials: true });
    //   }

    //   removeProductFromPromo(promoId: string, productId: string): Observable<ISimpleProduct> {
    //     return this.http.put<ISimpleProduct>(environment.api_url + `promotions/${promoId}`, { removeProduct: productId }, { withCredentials: true });
    //   }
}