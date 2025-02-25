import { Request, Response } from "express";
import { Category } from "../models/Category";
import {
  logger,
  HttpStatusCodes,
  HttpResponseMessages,
  ErrorMessageCodes,
  sendResponse,
} from "shared-constants";
/**
 * @desc Create a new category
 * @route POST /api/category/create-category
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, code, status, description } = req.body;

    const existingCategory = await Category.findOne({ code });
    if (existingCategory) {
      logger.error("Category code already exists");
      sendResponse({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        res,
        message: ErrorMessageCodes.INVALID_REQUEST,
      });

      return;
    }

    const category = new Category({ categoryName, code, status, description });
    await category.save();
    logger.info("Category created successfully");
    sendResponse({
      statusCode: HttpStatusCodes.CREATED,
      res,
      message: HttpResponseMessages.CREATED,
      data: category,
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
    const { name, status, code } = req.query;
    const query: any = {};

    if (name) query.name = { $regex: new RegExp(name as string, "i") };
    if (status) query.status = status;
    if (code) query.code = code;

    const categories = await Category.find(query).sort({ createdOn: -1 });

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
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
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
    const category = await Category.findById(req.params.id);
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
    const { name, code, status, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, code, status, description, updatedOn: new Date() },
      { new: true }
    );

    if (!category) {
      logger.error("Category not found");
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NOT_FOUND,
      });
      return;
    }

    logger.info("Category update successfully with ID");
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
    const category = await Category.findByIdAndDelete(req.params.id);
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
