import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/order';
import { Order, OrderItem } from '../../../core/models/order.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css'
})
export class OrderDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order: Order | null = null;
  items: OrderItem[] = [];

  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Order ID is missing.';
      return;
    }

    this.loadOrder(id);
  }

  loadOrder(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getMyOrderById(id).subscribe({
      next: (res: any) => {
        console.log('Order detail response:', res);

        this.order = res.data;
        this.items = res.data?.items || res.data?.order_items || [];
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load order.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getProductName(item: any): string {
    return (
      item.product?.name ||
      item.products?.name ||
      item.product_data?.name ||
      item.product_name ||
      item.name ||
      'Product'
    );
  }

  getProductImage(item: any): string {
    return (
      item.product?.image_url ||
      item.products?.image_url ||
      item.product_data?.image_url ||
      item.product_image_url ||
      item.image_url ||
      item.image ||
      'https://placehold.co/120x100?text=Product'
    );
  }

  getProductPrice(item: any): number {
    return Number(
      item.price ||
      item.product?.price ||
      item.products?.price ||
      item.product_data?.price ||
      item.product_price ||
      0
    );
  }

  getOrderTotal(): number {
    return Number((this.order as any)?.total || (this.order as any)?.total_amount || 0);
  }
}