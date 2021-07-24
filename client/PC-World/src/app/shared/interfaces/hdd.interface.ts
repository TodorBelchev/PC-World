export interface IHdd {
    _id: string;
    brand: string;
    model: string;
    capacity: number | string;
    readSpeed: number | string;
    writeSpeed: number | string;
    randomRead: number | string;
    randomWrite: number | string;
    mtbf: number | string;
    interface: string;
    formFactor: string;
    price: number | string;
    currentPrice: number | string;
    promoPrice: number | string;
    quantity: number | string;
    warranty: number | string;
    images: string[];
}