import { supabase } from '../config/supabase';

type CreateProductInput = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  category_id: string;
  created_by: string;
};

type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image_url?: string;
  category_id?: string;
};

type GetAllProductsParams = {
  search?: string;
  category_id?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export const createProduct = async (payload: CreateProductInput) => {
  const { data, error } = await supabase
    .from('products')
    .insert([payload])
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const getAllProducts = async ({
  search,
  category_id,
  minPrice,
  maxPrice,
  sort = 'desc',
  page = 1,
  limit = 10,
}: GetAllProductsParams) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('products')
    .select(
      `
      *,
      categories (
        id,
        name
      )
    `,
      { count: 'exact' }
    );

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  if (category_id) {
    query = query.eq('category_id', category_id);
  }

  if (minPrice !== undefined) {
    query = query.gte('price', minPrice);
  }

  if (maxPrice !== undefined) {
    query = query.lte('price', maxPrice);
  }

  query = query
    .order('created_at', { ascending: sort === 'asc' })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data,
    meta: {
      total: count || 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
    },
  };
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(
      `
      *,
      categories (
        id,
        name
      )
    `
    )
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateProduct = async (id: string, payload: UpdateProductInput) => {
  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) throw new Error(error.message);

  return null;
};