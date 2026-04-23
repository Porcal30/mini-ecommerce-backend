import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase';

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export const registerUser = async ({ name, email, password }: RegisterInput) => {
  const { data: existingUser, error: existingError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: newUser, error } = await supabase
    .from('users')
    .insert([
      {
        name,
        email,
        password: hashedPassword,
        role: 'user',
      },
    ])
    .select('id, name, email, role, created_at')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return newUser;
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  return user;
};

export const getUserById = async (id: string) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, name, email, role, created_at')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};