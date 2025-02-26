import { Request, Response } from "express";
import {
  saveCategory,
  findCategoryByCode,
  findCategoriesWithFilters,
  findCategoryById,
  updateCategoriesById,
  deleteCategoriesById,
} from "../repositories/Category.repository";
import {
  logger,
  HttpStatusCodes,
  HttpResponseMessages,
  ErrorMessageCodes,
  sendResponse,
} from "shared-constants";
import { CategoryFilter, ICategory } from "../interfaces/Category.interface";
import { Category } from "../models/Category";

/**
 * @desc Create a new category
 * @route POST /api/category/create-category
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, code, status, description } = req.body;

    // Check if category with given code already exists
    const existingCategory = await findCategoryByCode(code);
    if (existingCategory) {
      logger.error("Category code already exists");
      sendResponse({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        res,
        message: ErrorMessageCodes.INVALID_REQUEST,
      });
      return;
    }

    // Create a new category instance (no need to explicitly define '_id', etc.)
    const category = new Category({
      categoryName,
      code,
      status,
      description,
    });

    // Save the new category document
    await category.save();
    const categories: ICategory = category.toObject();

    logger.info("Category created successfully");
    sendResponse({
      statusCode: HttpStatusCodes.CREATED,
      res,
      message: HttpResponseMessages.CREATED,
      data: categories,
    });
  } catch (error) {
    logger.error("Error Creating category");
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error,
    });
    return;
  }
};

/**
 * @desc Get all categories with filters
 * @route GET /api/category/
 */
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { categoryName, status, code } = req.query;
    const query: CategoryFilter = {}; // Ensure query is typed

    if (categoryName) query.name = categoryName as string;
    if (status) query.status = status as "Active" | "Inactive";
    if (code) query.code = Number(code);

    const categories = await findCategoriesWithFilters(query);

    logger.info("Categories fetched successfully");
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: categories,
    });
  } catch (error) {
    logger.error("Error fetching categories");
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: "Error fetching categories",
      error,
    });
    return;
  }
};

/**
 * @desc Get a single category by ID
 * @route GET /api/category/:id
 */
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (!category) {
      logger.error("Category not found by ID");
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NOT_FOUND,
      });
      return;
    }

    logger.info("Category Found By ID");
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: category,
    });
  } catch (error) {
    logger.error("Error fetching category");
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};

/**
 * @desc Update a category by ID
 * @route PUT /api/update-category/:id
 */
export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryName, code, status, description } = req.body;

    const category = await updateCategoriesById(req.params.id, {
      categoryName,
      code,
      status,
      description,
      updatedOn: new Date(),
    });

    if (!category) {
      logger.error("Category not found");
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NOT_FOUND,
      });
      return;
    }

    logger.info("Category updated successfully with ID");
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: category,
    });
  } catch (error) {
    logger.error("Error updating category");
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};

/**
 * @desc Delete a category by ID
 * @route DELETE /api/delete-category/:id
 */
export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await deleteCategoriesById(req.params.id);
    if (!category) {
      logger.error("Category not found");
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NOT_FOUND,
      });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
    logger.info("Category deleted successfully");
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: "Category Deleted Successfully",
    });
  } catch (error) {
    logger.error("Error deleting category");
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};
