"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryById = exports.updateCategoryById = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const Category_repository_1 = require("../repositories/Category.repository");
const shared_constants_1 = require("shared-constants");
const Category_1 = require("../models/Category");
/**
 * @desc Create a new category
 * @route POST /api/category/create-category
 */
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName, code, status, description } = req.body;
        // Check if category with given code already exists
        const existingCategory = yield (0, Category_repository_1.findCategoryByCode)(code);
        if (existingCategory) {
            shared_constants_1.logger.error("Category code already exists");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.BAD_REQUEST,
                res,
                message: shared_constants_1.ErrorMessageCodes.INVALID_REQUEST,
                data: "Category code already exists",
            });
            return;
        }
        // Create a new category instance (no need to explicitly define '_id', etc.)
        const category = new Category_1.Category({
            categoryName,
            code,
            status,
            description,
        });
        // Save the new category document
        yield (0, Category_repository_1.saveCategory)(category);
        const categories = category.toObject();
        shared_constants_1.logger.info("Category created successfully");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.CREATED,
            res,
            message: shared_constants_1.HttpResponseMessages.CREATED,
            data: categories,
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error Creating category");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error,
        });
        return;
    }
});
exports.createCategory = createCategory;
/**
 * @desc Get all categories with filters
 * @route POST /api/category/
 */
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName, status, code } = req.body;
        const query = {}; // Ensure query is typed
        // Use a case-insensitive search for categoryName
        if (categoryName) {
            query.categoryName = { $regex: new RegExp(categoryName, "i") }; // 'i' for case insensitivity
        }
        if (status) {
            query.status = status;
        }
        if (code) {
            query.code = Number(code);
        }
        // Fetch categories with filters and ensuring isDeleted = 0
        const categories = yield (0, Category_repository_1.findCategoriesWithFilters)(query);
        // Check if no categories were found (empty array)
        if (categories.length === 0) {
            shared_constants_1.logger.info("No categories found with the provided filters.");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.OK,
                res,
                message: shared_constants_1.HttpResponseMessages.NO_CONTENT,
                data: "No categories found with the provided filters",
            });
            return;
        }
        shared_constants_1.logger.info("Categories fetched successfully");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: categories,
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error fetching categories");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: "Error fetching categories",
            error,
        });
    }
});
exports.getAllCategories = getAllCategories;
/**
 * @desc Get a single category by ID
 * @route GET /api/category/:id
 */
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, Category_repository_1.findCategoryById)(req.params.id);
        if (!category) {
            shared_constants_1.logger.error("Category not found by ID");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NOT_FOUND,
                data: "Category not found by ID",
            });
            return;
        }
        shared_constants_1.logger.info("Category Found By ID");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: category,
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error fetching category");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.getCategoryById = getCategoryById;
/**
 * @desc Update a category by ID
 * @route PUT /api/update-category/:id
 */
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName, code, status, description } = req.body;
        const category = yield (0, Category_repository_1.updateCategoriesById)(req.params.id, {
            categoryName,
            code,
            status,
            description,
            updatedOn: new Date(),
        });
        if (!category) {
            shared_constants_1.logger.error("Category not found");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NOT_FOUND,
                data: "Category not found with ID to update",
            });
            return;
        }
        shared_constants_1.logger.info("Category updated successfully with ID");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: category,
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error updating category");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.updateCategoryById = updateCategoryById;
/**
 * @desc Delete categories by ID (accepts array of IDs)
 * @route DELETE /api/delete-category
 */
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids; // Expecting an array of IDs in the request body
        if (!ids || ids.length === 0) {
            shared_constants_1.logger.error("No IDs provided");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.BAD_REQUEST,
                res,
                message: shared_constants_1.HttpResponseMessages.BAD_REQUEST,
                data: "Please provide at least one ID to delete",
            });
            return;
        }
        // Call helper function to delete categories by IDs
        const result = yield (0, Category_repository_1.deleteCategoriesById)(ids);
        if (result.modifiedCount === 0) {
            shared_constants_1.logger.error("Categories not found or already deleted");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NOT_FOUND,
                data: "Categories not found or already deleted with the provided IDs",
            });
            return;
        }
        shared_constants_1.logger.info(`${result.modifiedCount} categories deleted successfully`);
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: `${result.modifiedCount} Categories Deleted Successfully`,
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error deleting categories");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            res,
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.deleteCategoryById = deleteCategoryById;
