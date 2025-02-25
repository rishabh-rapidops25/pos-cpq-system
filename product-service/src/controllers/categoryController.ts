import { Request, Response } from "express";
import { Category } from "../models/Category";

/**
 * @desc Create a new category
 * @route POST /api/categories
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, code, status, description } = req.body;

    const existingCategory = await Category.findOne({ code });
    if (existingCategory) {
      res.status(400).json({ message: "Category code already exists" });
      return;
    }

    const category = new Category({ name, code, status, description });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
    return;
  }
};

/**
 * @desc Get all categories with filters
 * @route GET /api/categories
 */
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { name, status, code } = req.query;
    const query: any = {};

    if (name) query.name = { $regex: new RegExp(name as string, "i") };
    if (status) query.status = status;
    if (code) query.code = code;

    const categories = await Category.find(query).sort({ createdOn: -1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

/**
 * @desc Get a single category by ID
 * @route GET /api/categories/:id
 */
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
    return;
  }
};

/**
 * @desc Update a category by ID
 * @route PUT /api/categories/:id
 */
export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { name, code, status, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, code, status, description, updatedOn: new Date() },
      { new: true }
    );

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
    return;
  }
};

/**
 * @desc Delete a category by ID
 * @route DELETE /api/categories/:id
 */
export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
    return;
  }
};
