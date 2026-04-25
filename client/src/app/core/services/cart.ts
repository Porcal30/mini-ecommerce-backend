import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartResponse } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(this.apiUrl);
  }

  addItem(product_id: string, quantity: number = 1): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/items`, {
      product_id,
      quantity
    });
  }

  updateItemQuantity(cartItemId: string, quantity: number): Observable<CartResponse> {
    return this.http.patch<CartResponse>(`${this.apiUrl}/items/${cartItemId}`, {
      quantity
    });
  }

  removeItem(cartItemId: string): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.apiUrl}/items/${cartItemId}`);
  }

  clearCart(): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.apiUrl}/clear`);
  }
}