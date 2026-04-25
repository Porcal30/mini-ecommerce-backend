export interface CartItem {
  id: string; // cart_items.id, not product_id
  cart_id?: string;
  product_id: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    stock?: number;
  };
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: Cart | CartItem[] | any;
}