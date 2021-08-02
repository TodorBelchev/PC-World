export interface IOrder {
    _id: string;
    createdAt: string;
    products: [{
        purchasePrice: number;
        purchaseQuantity: number;
        type: string;
        _id: string;
        product: {
            _id: string;
            images: string[];
            brand: string;
            model: string;
        },
        onModel: string;
    }];
    status: string;
    user?: string;
    guest?: {
        firstName: string;
        lastName: string;
    }
    isVisible: boolean;
    deliveryPrice: number;
    totalPrice: number;
    completed: boolean;
}