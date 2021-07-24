export interface IVga {
    _id: string;
    brand: string;
    model: string;
    cores: number | string;
    gameClock: number | string;
    boostClock: number | string;
    memory: number | string;
    memoryClock: number | string;
    connectors: string;
    power: string;
    price: number | string;
    currentPrice: number | string;
    promoPrice: number | string;
    quantity: number | string;
    warranty: number | string;
    images: string[];
}
