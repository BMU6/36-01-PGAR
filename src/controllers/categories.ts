import type { RequestHandler } from "express";
import { Category } from "#models";
import type { CategoryType } from "#types";

import { categoryInputSchema } from "#schemas";
import { z } from "zod";
import type { Types } from "mongoose";

type CategoryInputDTO = z.infer<typeof categoryInputSchema>;
type CategoryOutputDTO = CategoryInputDTO & {
  _id: InstanceType<typeof Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
};
type IDParams = {
  id: string;
};

export const getCategories: RequestHandler<
  unknown,
  CategoryOutputDTO[] | { message: string }
> = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories as CategoryOutputDTO[]);
  } catch (error) {
    next(error);
  }
};

export const createCategory: RequestHandler<
  unknown,
  CategoryOutputDTO | { message: string },
  CategoryInputDTO
> = async (req, res, next) => {
  try {
    const { name } = req.body as CategoryInputDTO;
    const category = await Category.create({ name } satisfies CategoryType);
    res.status(201).json(category as CategoryOutputDTO);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById: RequestHandler<
  IDParams,
  CategoryOutputDTO | { message: string },
  CategoryInputDTO
> = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category as CategoryOutputDTO);
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler<
  IDParams,
  CategoryOutputDTO | { message: string },
  CategoryInputDTO
> = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const category = await Category.findByIdAndUpdate(id, body, { new: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category as CategoryOutputDTO);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler<
  IDParams,
  { message: string }
> = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
