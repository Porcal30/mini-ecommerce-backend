export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  category_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SingleProductResponse {
  success: boolean;
  message: string;
  data: Product;
}