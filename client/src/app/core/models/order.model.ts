export interface OrderItem {
  id: string;
  order_id?: string;
  product_id: string;
  quantity: number;
  price?: number;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  };
  products?: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  };
}

export interface Order {
  id: string;
  user_id?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total?: number;
  total_amount?: number;
  created_at?: string;
  updated_at?: string;
  items?: OrderItem[];
  order_items?: OrderItem[];
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: Order | Order[];
}