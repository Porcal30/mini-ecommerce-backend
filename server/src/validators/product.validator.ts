import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be at least 0'),
  stock: z.number().int().min(0, 'Stock must be at least 0'),
  image_url: z.string().url('Image URL must be valid').optional(),
  category_id: z.string().uuid('Category ID must be a valid UUID'),
});

export const updateProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters').optional(),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be at least 0').optional(),
  stock: z.number().int().min(0, 'Stock must be at least 0').optional(),
  image_url: z.string().url('Image URL must be valid').optional(),
  category_id: z.string().uuid('Category ID must be a valid UUID').optional(),
});