export interface IMemory {
    _id: string;
    brand: string;
    model: string;
    ramCapacity: number | string;
    memorySpeeds: number | string;
    memoryType: string;
    timings: string;
    platform: string;
    price: number | string;
    currentPrice: number | string;
    promoPrice: number | string;
    quantity: number | string;
    warranty: number | string;
    images: string[];
}