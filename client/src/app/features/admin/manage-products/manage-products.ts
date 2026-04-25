import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product';
import { CategoryService } from '../../../core/services/category';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.css'
})
export class ManageProducts implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products: Product[] = [];
  categories: Category[] = [];

  errorMessage = '';
  successMessage = '';

  isLoading = false; // ✅ added loading state

  selectedImageFile: File | null = null;
  uploadingProductId: string | null = null;

  formData: any = {
    name: '',
    price: '',
    category_id: '',
    stock: '',
    description: ''
  };

  editingId: string | null = null;

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  // ✅ updated with loading state
  loadProducts() {
    this.isLoading = true;

    this.productService.getProducts({ page: 1, limit: 100 }).subscribe({
      next: (res) => {
        this.products = res.data || [];
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load products.';
        console.error('Products error:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data || [];
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load categories.';
        console.error('Categories error:', err);
      }
    });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    }
  }

  uploadImage(productId: string) {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.selectedImageFile) {
      this.errorMessage = 'Please select an image first.';
      return;
    }

    this.uploadingProductId = productId;

    this.productService.uploadProductImage(productId, this.selectedImageFile).subscribe({
      next: () => {
        this.successMessage = 'Image uploaded successfully.';
        this.selectedImageFile = null;
        this.uploadingProductId = null;
        this.loadProducts();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to upload image.';
        this.uploadingProductId = null;
        console.error('Upload image error:', err);
      }
    });
  }

  submitForm() {
    this.errorMessage = '';
    this.successMessage = '';

    const payload: any = {
      name: this.formData.name,
      price: Number(this.formData.price),
      category_id: this.formData.category_id,
      description: this.formData.description
    };

    if (this.formData.stock !== '') {
      payload.stock = Number(this.formData.stock);
    }

    if (!payload.name || !payload.price || !payload.category_id || !payload.description) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const request = this.editingId
      ? this.productService.updateProduct(this.editingId, payload)
      : this.productService.createProduct(payload);

    request.subscribe({
      next: () => {
        this.successMessage = this.editingId
          ? 'Product updated successfully.'
          : 'Product created successfully.';
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to save product.';
        console.error('Save product error:', err);
      }
    });
  }

  editProduct(product: Product) {
    this.formData = {
      name: product.name,
      price: product.price,
      category_id: product.category_id || '',
      stock: (product as any).stock || '',
      description: product.description || ''
    };

    this.editingId = product.id;
  }

  deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.successMessage = 'Product deleted successfully.';
        this.loadProducts();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to delete product.';
      }
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      price: '',
      category_id: '',
      stock: '',
      description: ''
    };

    this.editingId = null;
  }
}