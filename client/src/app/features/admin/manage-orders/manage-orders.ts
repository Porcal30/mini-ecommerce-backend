import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/order';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-orders.html',
  styleUrl: './manage-orders.css'
})
export class ManageOrders implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getAllOrders().subscribe({
      next: (res: any) => {
        this.orders = Array.isArray(res.data) ? res.data : [];
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load orders.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  updateStatus(order: Order, status: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.orderService.updateOrderStatus(order.id, status).subscribe({
      next: () => {
        this.successMessage = 'Order status updated successfully.';
        this.loadOrders();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update order status.';
      }
    });
  }

  getOrderTotal(order: any): number {
    return Number(order.total || order.total_amount || 0);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}