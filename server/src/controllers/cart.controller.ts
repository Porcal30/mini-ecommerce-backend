import { NextFunction, Request, Response } from 'express';
import {
  addItemToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '../services/cart.service';
import {
  addCartItemSchema,
  updateCartItemSchema,
} from '../validators/cart.validator';

const getParamId = (id: string | string[] | undefined): string => {
  if (!id) throw new Error('ID is required');
  return Array.isArray(id) ? id[0] : id;
};

const getAuthUserId = (req: Request): string => {
  if (!req.user?.id) throw new Error('Unauthorized');
  return req.user.id;
};

export const getMyCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getAuthUserId(req);
    const cart = await getCart(userId);

    res.status(200).json({
      success: true,
      message: 'Cart fetched successfully',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getAuthUserId(req);
    const validatedData = addCartItemSchema.parse(req.body);

    const item = await addItemToCart(
      userId,
      validatedData.product_id,
      validatedData.quantity
    );

    res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getAuthUserId(req);
    const itemId = getParamId(req.params.id);
    const validatedData = updateCartItemSchema.parse(req.body);

    const item = await updateCartItem(userId, itemId, validatedData.quantity);

    res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const removeMyCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getAuthUserId(req);
    const itemId = getParamId(req.params.id);

    await removeCartItem(userId, itemId);

    res.status(200).json({
      success: true,
      message: 'Cart item removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const clearMyCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getAuthUserId(req);

    await clearCart(userId);

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};