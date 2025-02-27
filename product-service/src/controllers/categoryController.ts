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
        data: "Category code already exists",
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
    await saveCategory(category);
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
 * @route POST /api/category/
 */
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { categoryName, status, code } = req.body;
    const query: CategoryFilter = {}; // Ensure query is typed

    // Use a case-insensitive search for categoryName
    if (categoryName) {
      query.categoryName = { $regex: new RegExp(categoryName, "i") }; // 'i' for case insensitivity
    }
    if (status) {
      query.status = status as "Active" | "Inactive";
    }
    if (code) {
      query.code = Number(code);
    }

    // Fetch categories with filters and ensuring isDeleted = 0
    const categories = await findCategoriesWithFilters(query);

    // Check if no categories were found (empty array)
    if (categories.length === 0) {
      logger.info("No categories found with the provided filters.");
      sendResponse({
        statusCode: HttpStatusCodes.OK,
        res,
        message: HttpResponseMessages.NO_CONTENT,
        data: "No categories found with the provided filters",
      });
      return;
    }

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
  }
};

/**
 * @desc Search global categories
 * @route POST /api/category/search
 */
export const searchCategories = async (req: Request, res: Response) => {
  try {
    const { search } = req.body; // Global search input
    const query: any = { isDeleted: 0 }; // Ensure we filter out deleted records

    if (search) {
      query.$or = [
        { categoryName: { $regex: new RegExp(search, "i") } }, // Case-insensitive search
        { code: isNaN(Number(search)) ? undefined : Number(search) }, // Match code if search is a number
        {
          status:
            search === "Active" || search === "Inactive" ? search : undefined,
        }, // Match status only if valid
      ].filter(Boolean); // Remove undefined values
    }

    const categories = await findCategoriesWithFilters(query);

    if (categories.length === 0) {
      logger.info("No categories found with the provided filters.");
      sendResponse({
        statusCode: HttpStatusCodes.OK,
        res,
        message: HttpResponseMessages.NO_CONTENT,
        data: "No categories found with the provided filters",
      });
      return;
    }

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
        data: "Category not found by ID",
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
        data: "Category not found with ID to update",
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
 * @desc Delete categories by ID (accepts array of IDs)
 * @route DELETE /api/delete-category
 */
export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids; // Expecting an array of IDs in the request body

    if (!ids || ids.length === 0) {
      logger.error("No IDs provided");
      sendResponse({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        res,
        message: HttpResponseMessages.BAD_REQUEST,
        data: "Please provide at least one ID to delete",
      });
      return;
    }

    // Call helper function to delete categories by IDs
    const result = await deleteCategoriesById(ids);

    if (result.modifiedCount === 0) {
      logger.error("Categories not found or already deleted");
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NOT_FOUND,
        data: "Categories not found or already deleted with the provided IDs",
      });
      return;
    }

    logger.info(`${result.modifiedCount} categories deleted successfully`);
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: `${result.modifiedCount} Categories Deleted Successfully`,
    });
  } catch (error) {
    logger.error("Error deleting categories");
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};
