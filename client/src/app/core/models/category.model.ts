export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
}