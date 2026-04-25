import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductResponse, SingleProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(params?: {
    search?: string;
    category_id?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sort?: string;
  }): Observable<ProductResponse> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }

    return this.http.get<ProductResponse>(this.apiUrl, { params: httpParams });
  }

  // ✅ Get single product by ID
  getProductById(id: string): Observable<SingleProductResponse> {
    return this.http.get<SingleProductResponse>(`${this.apiUrl}/${id}`);
  }

  // ✅ Create product
  createProduct(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // ✅ Update product
  updateProduct(id: string, data: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  // ✅ Delete product
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ Upload product image
  uploadProductImage(id: string, file: File) {
    const formData = new FormData();
    formData.append('image', file); // ⚠️ change to 'file' if backend uses upload.single('file')

    return this.http.post(`${this.apiUrl}/${id}/image`, formData);
  }
}