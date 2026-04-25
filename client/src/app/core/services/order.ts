import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  checkout(): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/checkout`, {});
  }

  getMyOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/my-orders`);
  }

  getMyOrderById(id: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/my-orders/${id}`);
  }

  getAllOrders(){
    return this.http.get<OrderResponse>(this.apiUrl);
  }

  updateOrderStatus(id: string, status: string) {
    return this.http.patch<OrderResponse>(`${this.apiUrl}/${id}/status`, {
      status
    });
  }
}