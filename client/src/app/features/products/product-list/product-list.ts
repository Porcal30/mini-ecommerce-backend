import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import { CategoryService } from '../../../core/services/category';
import { Category } from '../../../core/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products: Product[] = [];
  categories: Category[] = [];

  isLoading = false;
  errorMessage = '';

  search = '';
  category_id = '';
  minPrice?: number;
  maxPrice?: number;
  sort = '';
  page = 1;
  limit = 8;
  totalPages = 1;

  private filterTimeout: any;

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data || [];
      },
      error: () => {
        this.categories = [];
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts({
      search: this.search,
      category_id: this.category_id,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sort: this.sort,
      page: this.page,
      limit: this.limit
    }).subscribe({
      next: (res) => {
  this.products = res.data || [];

  if (this.sort === 'price_asc') {
    this.products = this.products.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (this.sort === 'price_desc') {
    this.products = this.products.sort((a, b) => Number(b.price) - Number(a.price));
  }

  if (this.sort === 'newest') {
    this.products = this.products.sort(
      (a, b) =>
        new Date(b.created_at || '').getTime() -
        new Date(a.created_at || '').getTime()
    );
  }

  this.totalPages = res.meta?.totalPages || 1;
},
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load products';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.page = 1;

    clearTimeout(this.filterTimeout);

    this.filterTimeout = setTimeout(() => {
      this.loadProducts();
    }, 300);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
}