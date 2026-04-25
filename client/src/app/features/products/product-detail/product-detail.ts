import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { AuthService } from '../../../core/services/auth';
import { CartService } from '../../../core/services/cart'; // ✅ added

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private cartService = inject(CartService); // ✅ added

  product: Product | null = null;
  isLoading = false;
  errorMessage = '';

  // ✅ cart state
  cartMessage = '';
  cartError = '';
  isAddingToCart = false;

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Product ID is missing.';
      return;
    }

    this.loadProduct(id);
  }

  loadProduct(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load product.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // ✅ Add to Cart method
  addToCart(): void {
    if (!this.product) return;

    this.cartMessage = '';
    this.cartError = '';
    this.isAddingToCart = true;

    this.cartService.addItem(this.product.id, 1).subscribe({
      next: () => {
        this.cartMessage = 'Product added to cart.';
      },
      error: (err) => {
        this.cartError = err.error?.message || 'Failed to add product to cart.';
      },
      complete: () => {
        this.isAddingToCart = false;
      }
    });
  }
}