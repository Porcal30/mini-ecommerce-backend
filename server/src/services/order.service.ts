import { supabase } from '../config/supabase';
import { clearCart, getCart } from './cart.service';

export const checkout = async (userId: string) => {
  const cartData = await getCart(userId);

  if (!cartData.items.length) {
    throw new Error('Cart is empty');
  }

  let totalAmount = 0;

  for (const item of cartData.items as any[]) {
    const product = item.products;

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock < item.quantity) {
      throw new Error(`Not enough stock for ${product.name}`);
    }

    totalAmount += Number(product.price) * item.quantity;
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        total_amount: totalAmount,
        status: 'pending',
      },
    ])
    .select('*')
    .single();

  if (orderError) throw new Error(orderError.message);

  const orderItems = (cartData.items as any[]).map((item) => ({
    order_id: order.id,
    product_id: item.products.id,
    product_name: item.products.name,
    price: Number(item.products.price),
    quantity: item.quantity,
    subtotal: Number(item.products.price) * item.quantity,
  }));

  const { error: orderItemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (orderItemsError) throw new Error(orderItemsError.message);

  for (const item of cartData.items as any[]) {
    const newStock = item.products.stock - item.quantity;

    const { error: stockError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', item.products.id);

    if (stockError) throw new Error(stockError.message);
  }

  await clearCart(userId);

  return order;
};

export const getMyOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        product_id,
        product_name,
        price,
        quantity,
        subtotal
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const getMyOrderById = async (userId: string, orderId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        product_id,
        product_name,
        price,
        quantity,
        subtotal
      )
    `)
    .eq('id', orderId)
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      users (
        id,
        name,
        email
      ),
      order_items (
        id,
        product_id,
        product_name,
        price,
        quantity,
        subtotal
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  return data;
};