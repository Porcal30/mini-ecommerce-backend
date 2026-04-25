import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category';
import { Category } from '../../../core/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-categories.html',
  styleUrl: './manage-categories.css'
})
export class ManageCategories implements OnInit {
  private categoryService = inject(CategoryService);

  categories: Category[] = [];

  formData: any = {
    name: '',
    description: ''
  };

  editingId: string | null = null;

  errorMessage = '';
  successMessage = '';

  isLoading = false; // ✅ added

  ngOnInit(): void {
    this.loadCategories();
  }

  // ✅ updated with loading state
  loadCategories() {
    this.isLoading = true;

    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data || [];
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load categories.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  submitForm() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.formData.name) {
      this.errorMessage = 'Name is required.';
      return;
    }

    const request = this.editingId
      ? this.categoryService.updateCategory(this.editingId, this.formData)
      : this.categoryService.createCategory(this.formData);

    request.subscribe({
      next: () => {
        this.successMessage = this.editingId
          ? 'Category updated successfully.'
          : 'Category created successfully.';
        this.resetForm();
        this.loadCategories();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to save category.';
      }
    });
  }

  editCategory(category: Category) {
    this.formData = { ...category };
    this.editingId = category.id;
  }

  deleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.successMessage = 'Category deleted successfully.';
        this.loadCategories();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to delete category.';
      }
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      description: ''
    };
    this.editingId = null;
  }
}