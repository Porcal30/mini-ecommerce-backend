import { NextFunction, Request, Response } from 'express';
import {
  checkout,
  getAllOrders,
  getMyOrderById,
  getMyOrders,
  updateOrderStatus,
} from '../services/order.service';
import { updateOrderStatusSchema } from '../validators/order.validator';

const getParamId = (id: string | string[] | undefined): string => {
  if (!id) throw new Error('ID is required');
  return Array.isArray(id) ? id[0] : id;
};

const getAuthUserId = (req: Request): string => {
  if (!req.user?.id) throw new Error('Unauthorized');
  return req.user.id;
};

export const checkoutOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getAuthUserId(req);
    const order = await checkout(userId);

    res.status(201).json({
      success: true,
      message: 'Checkout successful',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrderList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getAuthUserId(req);
    const orders = await getMyOrders(userId);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getMySingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getAuthUserId(req);
    const orderId = getParamId(req.params.id);

    const order = await getMyOrderById(userId, orderId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getAllOrders();

    res.status(200).json({
      success: true,
      message: 'All orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = getParamId(req.params.id);
    const validatedData = updateOrderStatusSchema.parse(req.body);

    const order = await updateOrderStatus(orderId, validatedData.status);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};