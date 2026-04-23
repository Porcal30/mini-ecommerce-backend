import { supabase } from '../config/supabase';

type CreateCategoryInput = {
  name: string;
  description?: string;
};

type UpdateCategoryInput = {
  name?: string;
  description?: string;
};

export const createCategory = async (payload: CreateCategoryInput) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([payload])
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const getCategoryById = async (id: string) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateCategory = async (id: string, payload: UpdateCategoryInput) => {
  const { data, error } = await supabase
    .from('categories')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);

  return null;
};