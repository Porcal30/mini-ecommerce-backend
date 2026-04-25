import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryResponse } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.apiUrl);
  }

  // ✅ Create category
  createCategory(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // ✅ Update category
  updateCategory(id: string, data: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  // ✅ Delete category
  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}