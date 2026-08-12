export const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
export const PAYMENT_METHOD = 'Cash on Delivery' as const;
export type PaymentMethod = typeof PAYMENT_METHOD;

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

export interface CheckoutPayload {
  customerInfo: CustomerInfo;
  paymentMethod: PaymentMethod;
}

export interface OrderLine {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  products: OrderLine[];
  totalPrice: number;
  customerInfo?: CustomerInfo;
  paymentMethod?: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
}
