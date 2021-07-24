export interface ICase {
    _id: string;
    brand: string;
    model: string;
    formFactor: string;
    supportedMB: string;
    frontPanel: string;
    height: number | string;
    width: number | string;
    length: number | string;
    price: number | string;
    currentPrice: number | string;
    promoPrice: number | string;
    quantity: number | string;
    warranty: number | string;
    images: string[];
}