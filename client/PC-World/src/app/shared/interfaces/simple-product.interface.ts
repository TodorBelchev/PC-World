export interface ISimpleProduct {
    _id: string;
    brand: string;
    model: string;
    images: string[];
    quantity: number | string;
    price: number | string;
    promoPrice: number | string;
    productType: string;
}

export interface IProduct {
    _id: string;
    brand: string;
    model: string;
    images: string[];
    quantity: number;
    price: number;
    promoPrice: number;
    type: string;
    warranty: number;
    urlPrefix?: string;
  }