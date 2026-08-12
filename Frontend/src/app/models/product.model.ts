import { User } from './user.model';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdBy?: User | string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductPayload = Pick<Product, 'title' | 'description' | 'price' | 'image' | 'category' | 'stock'>;

export interface ProductsResponse {
  success: boolean;
  message: string;
  products: Product[];
}
