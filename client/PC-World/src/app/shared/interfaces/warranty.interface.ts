import { IOrder } from "./order.interface";
import { IProduct } from "./simple-product.interface";

export interface IWarranty {
    _id: string,
    purchaseQuantity: number,
    warranty: number,
    user: string,
    product: IProduct,
    onModel: string,
    purchasePrice: number,
    order: IOrder,
    createdAt: number
}