export interface IMonitor {
    _id: string;
    brand: string;
    model: string;
    type: string;
    size: number | string;
    resolution: string;
    refreshRate: number | string;
    responseTime: number | string;
    brightness: number | string;
    ports: string;
    price: number | string;
    currentPrice: number | string;
    promoPrice: number | string;
    quantity: number | string;
    warranty: number | string;
    images: string[];
}