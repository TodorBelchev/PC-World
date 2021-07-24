export interface IMotherboard {
    _id: string;
    brand: string;
    model: string;
    socket: string;
    formFactor: string;
    chipset: string;
    memorySlots: number | string;
    memorySpeeds: string;
    ramCapacity: number | string;
    audio: string;
    lan: string;
    wireless: string;
    connectors: string;
    storage: string;
    price: number | string;
    currentPrice: number | string;
    promoPrice: number | string;
    quantity: number | string;
    warranty: number | string;
    images: string[];
}