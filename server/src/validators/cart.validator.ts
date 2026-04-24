import { z } from 'zod';

export const addCartItemSchema = z.object({
  product_id: z.string().uuid('Product ID must be a valid UUID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});