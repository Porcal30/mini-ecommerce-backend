import { NextFunction, Request, Response } from 'express';
import {
  createProduct as createProductService,
  deleteProduct as deleteProductService,
  getAllProducts as getAllProductsService,
  getProductById as getProductByIdService,
  updateProduct as updateProductService,
} from '../services/product.service';
import { uploadProductImage } from '../services/upload.service'; // ✅ NEW IMPORT
import {
  createProductSchema,
  updateProductSchema,
} from '../validators/product.validator';

const getParamId = (id: string | string[] | undefined): string => {
  if (!id) {
    throw new Error('Product ID is required');
  }

  return Array.isArray(id) ? id[0] : id;
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = createProductSchema.parse(req.body);

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const product = await createProductService({
      ...validatedData,
      created_by: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search =
      typeof req.query.search === 'string' ? req.query.search : undefined;

    const category_id =
      typeof req.query.category_id === 'string'
        ? req.query.category_id
        : undefined;

    const minPrice =
      typeof req.query.minPrice === 'string'
        ? Number(req.query.minPrice)
        : undefined;

    const maxPrice =
      typeof req.query.maxPrice === 'string'
        ? Number(req.query.maxPrice)
        : undefined;

    const sort =
      req.query.sort === 'asc' || req.query.sort === 'desc'
        ? req.query.sort
        : 'desc';

    const page =
      typeof req.query.page === 'string' ? Number(req.query.page) : 1;

    const limit =
      typeof req.query.limit === 'string' ? Number(req.query.limit) : 10;

    const result = await getAllProductsService({
      search,
      category_id,
      minPrice,
      maxPrice,
      sort,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParamId(req.params.id);
    const product = await getProductByIdService(id);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParamId(req.params.id);
    const validatedData = updateProductSchema.parse(req.body);
    const product = await updateProductService(id, validatedData);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParamId(req.params.id);
    await deleteProductService(id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProductImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParamId(req.params.id);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded',
      });
    }

    const imageUrl = await uploadProductImage(req.file);

    const updatedProduct = await updateProductService(id, {
      image_url: imageUrl,
    });

    res.status(200).json({
      success: true,
      message: 'Product image uploaded successfully',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};