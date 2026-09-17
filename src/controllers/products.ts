import { Product, Category } from "#models";
import type { RequestHandler } from "express";
import { Types } from "mongoose";
import { productInputSchema } from "#schemas";
import { z } from "zod";

type ProductInputDTO = z.infer<typeof productInputSchema>;
type ProductOutputDTO = ProductInputDTO & {
  _id: InstanceType<typeof Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
};
type IDParams = {
  id: string;
};

export const getAllProducts: RequestHandler<
  unknown,
  ProductOutputDTO[] | { message: string }
> = async (req, res, next) => {
  try {
    const { category } = req.query;

    const filter = typeof category === "string" ? { category } : {};

    const products = await Product.find(filter).lean();

    const formattedProducts: ProductOutputDTO[] = (products as any[]).map(
      (product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        category: toIdString(product.category),
        _id: product._id,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }),
    );

    return res.json(formattedProducts);
  } catch (error) {
    next(error);
  }
};

export const createProduct: RequestHandler<
  unknown,
  ProductOutputDTO | { message: string },
  ProductInputDTO
> = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res
        .status(400)
        .json({ message: "Invalid category. Category does not exist." });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
    });

    const plainProduct = product.toObject();

    const formattedProduct: ProductOutputDTO = {
      _id: plainProduct._id,
      name: plainProduct.name,
      description: plainProduct.description,
      price: plainProduct.price,
      category: plainProduct.category.toString(),
      createdAt: (plainProduct as any).createdAt,
      updatedAt: (plainProduct as any).updatedAt,
    };

    return res.status(201).json(formattedProduct);
  } catch (error) {
    next(error);
  }
};

function toIdString(value: any): string {
  if (value && typeof value === "object" && "_id" in value) {
    return value._id.toString();
  }
  return value?.toString() || "";
}

export const getProductById: RequestHandler<
  IDParams,
  ProductOutputDTO | { message: string },
  ProductInputDTO
> = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const product = await Product.findById(id).populate("category").lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productDTO: ProductOutputDTO = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: toIdString(product.category),
      _id: product._id,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return res.json(productDTO);
  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler<
  IDParams,
  ProductOutputDTO | { message: string },
  ProductInputDTO
> = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    if (body.category) {
      const categoryExists = await Category.findById(body.category);
      if (!categoryExists) {
        return res
          .status(400)
          .json({ message: "Invalid category. Category does not exist." });
      }
    }

    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
    }).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productDTO: ProductOutputDTO = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: toIdString(product.category),
      _id: product._id,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return res.json(productDTO);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler<
  IDParams,
  { message: string }
> = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const product = await Product.findByIdAndDelete(id).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
