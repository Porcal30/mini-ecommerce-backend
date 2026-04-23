import { supabase } from '../config/supabase';

export const uploadProductImage = async (file: Express.Multer.File) => {
  const fileExt = file.originalname.split('.').pop();
  const fileName = `products/${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);

  return data.publicUrl;
};