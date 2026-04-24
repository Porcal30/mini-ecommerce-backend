import { Router } from 'express';
import {
  checkoutOrder,
  getAdminOrders,
  getMyOrderList,
  getMySingleOrder,
  updateAdminOrderStatus,
} from '../controllers/order.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Checkout current user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Checkout successful
 */
router.post('/checkout', protect, checkoutOrder);

/**
 * @swagger
 * /orders/my-orders:
 *   get:
 *     summary: Get current user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
router.get('/my-orders', protect, getMyOrderList);

/**
 * @swagger
 * /orders/my-orders/{id}:
 *   get:
 *     summary: Get current user's single order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order fetched successfully
 */
router.get('/my-orders/:id', protect, getMySingleOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Admin - Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All orders fetched successfully
 */
router.get('/', protect, authorize('admin'), getAdminOrders);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Admin - Update order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *                 example: processing
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.patch('/:id/status', protect, authorize('admin'), updateAdminOrderStatus);

export default router;