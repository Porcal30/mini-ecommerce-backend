import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart';
import { CartItem } from '../../../core/models/cart.model';
import { RouterLink, Router } from '@angular/router';
import { OrderService } from '../../../core/services/order';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})
export class CartPage implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  items: CartItem[] = [];
  isLoading = false;
  isCheckingOut = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.cartService.getCart().subscribe({
      next: (res: any) => {
        const data = res.data;
        this.items = data?.items || data?.cart_items || data || [];
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load cart.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getProductName(item: any): string {
    return item.product?.name || item.products?.name || item.name || 'Product';
  }

  getProductPrice(item: any): number {
    return Number(
      item.product?.price ||
      item.products?.price ||
      item.price ||
      0
    );
  }

  getProductImage(item: any): string {
    return (
      item.product?.image_url ||
      item.products?.image_url ||
      item.image_url ||
      'https://placehold.co/120x100?text=Product'
    );
  }

  getTotal(): number {
    return this.items.reduce((total, item: any) => {
      return total + this.getProductPrice(item) * Number(item.quantity || 0);
    }, 0);
  }

  increase(item: CartItem): void {
    this.updateQuantity(item, item.quantity + 1);
  }

  decrease(item: CartItem): void {
    if (item.quantity <= 1) return;
    this.updateQuantity(item, item.quantity - 1);
  }

  updateQuantity(item: CartItem, quantity: number): void {
    this.cartService.updateItemQuantity(item.id, quantity).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update quantity.';
      }
    });
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.id).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to remove item.';
      }
    });
  }

  clearCart(): void {
    if (!confirm('Clear your cart?')) return;

    this.cartService.clearCart().subscribe({
      next: () => {
        this.successMessage = 'Cart cleared.';
        this.loadCart();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to clear cart.';
      }
    });
  }

  checkout(): void {
    if (this.items.length === 0) {
      this.errorMessage = 'Your cart is empty.';
      return;
    }

    if (!confirm('Proceed to checkout?')) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.isCheckingOut = true;

    this.orderService.checkout().subscribe({
      next: () => {
        this.successMessage = 'Checkout successful.';
        this.loadCart();
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Checkout failed.';
        this.isCheckingOut = false;
      },
      complete: () => {
        this.isCheckingOut = false;
      }
    });
  }
}