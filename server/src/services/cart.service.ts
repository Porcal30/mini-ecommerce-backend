import { supabase } from '../config/supabase';

export const getOrCreateCart = async (userId: string) => {
  const { data: existingCart, error: findError } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (findError) throw new Error(findError.message);

  if (existingCart) return existingCart;

  const { data: newCart, error: createError } = await supabase
    .from('carts')
    .insert([{ user_id: userId }])
    .select('*')
    .single();

  if (createError) throw new Error(createError.message);

  return newCart;
};

export const getCart = async (userId: string) => {
  const cart = await getOrCreateCart(userId);

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      products (
        id,
        name,
        price,
        stock,
        image_url
      )
    `)
    .eq('cart_id', cart.id)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  const total = (data || []).reduce((sum: number, item: any) => {
    return sum + Number(item.products?.price || 0) * item.quantity;
  }, 0);

  return {
    cart,
    items: data || [],
    total,
  };
};

export const addItemToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const cart = await getOrCreateCart(userId);

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, stock')
    .eq('id', productId)
    .single();

  if (productError || !product) {
    throw new Error('Product not found');
  }

  if (product.stock < quantity) {
    throw new Error('Not enough stock available');
  }

  const { data: existingItem, error: existingError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cart.id)
    .eq('product_id', productId)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message);

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (product.stock < newQuantity) {
      throw new Error('Not enough stock available');
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: newQuantity })
      .eq('id', existingItem.id)
      .select('*')
      .single();

    if (error) throw new Error(error.message);

    return data;
  }

  const { data, error } = await supabase
    .from('cart_items')
    .insert([
      {
        cart_id: cart.id,
        product_id: productId,
        quantity,
      },
    ])
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateCartItem = async (
  userId: string,
  itemId: string,
  quantity: number
) => {
  const cart = await getOrCreateCart(userId);

  const { data: item, error: itemError } = await supabase
    .from('cart_items')
    .select('*, products(stock)')
    .eq('id', itemId)
    .eq('cart_id', cart.id)
    .single();

  if (itemError || !item) {
    throw new Error('Cart item not found');
  }

  if (item.products.stock < quantity) {
    throw new Error('Not enough stock available');
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const removeCartItem = async (userId: string, itemId: string) => {
  const cart = await getOrCreateCart(userId);

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)
    .eq('cart_id', cart.id);

  if (error) throw new Error(error.message);

  return null;
};

export const clearCart = async (userId: string) => {
  const cart = await getOrCreateCart(userId);

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cart.id);

  if (error) throw new Error(error.message);

  return null;
};