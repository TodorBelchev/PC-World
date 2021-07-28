export interface ISimpleProduct {
    _id: string;
    brand: string;
    model: string;
    images: string[];
    quantity: number | string;
    price: number | string;
    promoPrice: number | string;
}