import { Product } from './product.model';

export interface CartLine {
  _id?: string;
  productId: Product | string;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  products: CartLine[];
}
