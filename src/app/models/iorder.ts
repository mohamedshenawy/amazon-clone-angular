export interface Iorder {
  id: number;
  orderDate: Date;
  estimatedDeliveryDate: Date;
  orderAddress: string;
  totalPrice: number;
  customerId: number;
  status: number;
}
