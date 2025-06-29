export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  userId: number;
  restaurantId: number;
  restaurantName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'out_for_delivery'
    | 'delivered'
    | 'cancelled';
  orderDate: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  deliveryAddress: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
  };
  specialInstructions?: string;
}
