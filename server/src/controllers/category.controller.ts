import { NextFunction, Request, Response } from 'express';
import {
  createCategory as createCategoryService,
  deleteCategory as deleteCategoryService,
  getAllCategories as getAllCategoriesService,
  getCategoryById as getCategoryByIdService,
  updateCategory as updateCategoryService,
} from '../services/category.service';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../validators/category.validator';

const getParamId = (id: string | string[] | undefined): string => {
  if (!id) {
    throw new Error('Category ID is required');
  }

  return Array.isArray(id) ? id[0] : id;
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = createCategorySchema.parse(req.body);
    const category = await createCategoryService(validatedData);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategoriesService();

    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParamId(req.params.id);
    const category = await getCategoryByIdService(id);

    res.status(200).json({
      success: true,
      message: 'Category fetched successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParamId(req.params.id);
    const validatedData = updateCategorySchema.parse(req.body);
    const category = await updateCategoryService(id, validatedData);

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParamId(req.params.id);
    await deleteCategoryService(id);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};