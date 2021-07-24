export interface IProcessor {
    _id: string;
    brand: string;
    model: string;
    cores: number | string;
    threads: number | string;
    baseClock: number | string;
    boostClock: number | string;
    cache: number | string;
    price: number | string;
    currentPrice: number | string;
    promoPrice: number | string;
    box: boolean;
    quantity: number | string;
    warranty: number | string;
    images: string[];
}
