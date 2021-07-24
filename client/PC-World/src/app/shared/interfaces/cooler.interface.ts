export interface ICooler {
    _id: string;
    brand: string;
    model: string;
    socket: string;
    height: number | string;
    price: number | string;
    fanRPM: number | string;
    airflow: number | string;
    noise: number | string;
    fanSize: number | string;
    connector: string;
    type: string;
    currentPrice: number | string;
    promoPrice: number | string;
    quantity: number | string;
    warranty: number | string;
    images: string[];
}