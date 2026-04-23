import { Router } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

router.get('/db-test', async (_req, res) => {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Database connected successfully',
    data,
  });
});

export default router;