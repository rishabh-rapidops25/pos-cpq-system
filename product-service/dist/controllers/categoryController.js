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
const Category_1 = require("../models/Category");
const shared_constants_1 = require("shared-constants");
/**
 * @desc Create a new category
 * @route POST /api/category/create-category
 */
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName, code, status, description } = req.body;
        const existingCategory = yield Category_1.Category.findOne({ code });
        if (existingCategory) {
            shared_constants_1.logger.error("Category code already exists");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.BAD_REQUEST,
                res,
                message: shared_constants_1.ErrorMessageCodes.INVALID_REQUEST,
            });
            return;
        }
        const category = new Category_1.Category({ categoryName, code, status, description });
        yield category.save();
        shared_constants_1.logger.info("Category created successfully");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.CREATED,
            res,
            message: shared_constants_1.HttpResponseMessages.CREATED,
            data: category,
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
 * @route GET /api/category/
 */
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, status, code } = req.query;
        const query = {};
        if (name)
            query.name = { $regex: new RegExp(name, "i") };
        if (status)
            query.status = status;
        if (code)
            query.code = code;
        const categories = yield Category_1.Category.find(query).sort({ createdOn: -1 });
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
            message: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            error: error,
        });
        return;
    }
});
exports.getAllCategories = getAllCategories;
/**
 * @desc Get a single category by ID
 * @route GET /api/category/:id
 */
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findById(req.params.id);
        if (!category) {
            shared_constants_1.logger.error("Category not found by ID");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NOT_FOUND,
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
        const { name, code, status, description } = req.body;
        const category = yield Category_1.Category.findByIdAndUpdate(req.params.id, { name, code, status, description, updatedOn: new Date() }, { new: true });
        if (!category) {
            shared_constants_1.logger.error("Category not found");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NOT_FOUND,
            });
            return;
        }
        shared_constants_1.logger.info("Category update successfully with ID");
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
 * @desc Delete a category by ID
 * @route DELETE /api/delete-category/:id
 */
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findByIdAndDelete(req.params.id);
        if (!category) {
            shared_constants_1.logger.error("Category not found");
            (0, shared_constants_1.sendResponse)({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                res,
                message: shared_constants_1.HttpResponseMessages.NOT_FOUND,
            });
            return;
        }
        res.status(200).json({ message: "Category deleted successfully" });
        shared_constants_1.logger.info("Category deleted successfully");
        (0, shared_constants_1.sendResponse)({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            res,
            message: shared_constants_1.HttpResponseMessages.SUCCESS,
            data: "Category Deleted Successfully",
        });
    }
    catch (error) {
        shared_constants_1.logger.error("Error deleting category");
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
