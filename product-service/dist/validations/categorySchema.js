"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategorySchema = exports.getCategoryByIdSchema = exports.getAllCategoriesSchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Create Category Schema
exports.createCategorySchema = joi_1.default.object({
    categoryName: joi_1.default.string()
        .min(3)
        .max(100)
        .pattern(/^[A-Za-z0-9\s]+$/)
        .required()
        .messages({
        "string.base": `"categoryName" should be a type of 'text'`,
        "string.empty": `"categoryName" cannot be an empty field`,
        "string.min": `"categoryName" should have a minimum length of {#limit}`,
        "string.max": `"categoryName" should have a maximum length of {#limit}`,
        "any.required": `"categoryName" is a required field`,
    }),
    code: joi_1.default.number().integer().min(0).required().messages({
        "number.base": `"code" should be a type of 'number'`,
        "number.integer": `"code" must be an integer`,
        "number.min": `"code" must be at least {#limit}`,
        "any.required": `"code" is a required field`,
    }),
    status: joi_1.default.string().valid("Active", "Inactive").required().messages({
        "any.only": `"status" must be one of 'Active' or 'Inactive'`,
        "any.required": `"status" is a required field`,
    }),
    description: joi_1.default.string().max(500).optional().messages({
        "string.base": `"description" should be a type of 'text'`,
        "string.max": `"description" should have a maximum length of {#limit}`,
    }),
});
// Update Category Schema
exports.updateCategorySchema = joi_1.default.object({
    categoryName: joi_1.default.string()
        .min(3)
        .max(100)
        .pattern(/^[A-Za-z0-9\s]+$/)
        .optional()
        .messages({
        "string.base": `"categoryName" should be a type of 'text'`,
        "string.empty": `"categoryName" cannot be an empty field`,
        "string.min": `"categoryName" should have a minimum length of {#limit}`,
        "string.max": `"categoryName" should have a maximum length of {#limit}`,
    }),
    code: joi_1.default.number().integer().min(0).optional().messages({
        "number.base": `"code" should be a type of 'number'`,
        "number.integer": `"code" must be an integer`,
        "number.min": `"code" must be at least {#limit}`,
    }),
    status: joi_1.default.string().valid("Active", "Inactive").optional().messages({
        "any.only": `"status" must be one of 'Active' or 'Inactive'`,
    }),
    description: joi_1.default.string().max(500).optional().messages({
        "string.base": `"description" should be a type of 'text'`,
        "string.max": `"description" should have a maximum length of {#limit}`,
    }),
});
exports.getAllCategoriesSchema = joi_1.default.object({
    categoryName: joi_1.default.string().optional().messages({
        "string.base": "Category name must be a string.",
        "string.empty": "Category name cannot be empty.",
    }),
    status: joi_1.default.string().valid("Active", "Inactive").optional().messages({
        "string.base": "Status must be a string.",
        "any.only": 'Status must be either "Active" or "Inactive".',
    }),
    code: joi_1.default.number().integer().optional().messages({
        "number.base": "Code must be a valid integer.",
        "number.integer": "Code must be an integer.",
    }),
});
exports.getCategoryByIdSchema = joi_1.default.object({
    id: joi_1.default.string().required().messages({
        "string.pattern.base": "Category ID must be a valid MongoDB ObjectId.",
        "string.empty": "Category ID cannot be empty.",
        "any.required": "Category ID is required.",
    }),
});
exports.deleteCategorySchema = joi_1.default.object({
    ids: joi_1.default.array()
        .items(joi_1.default.string()
        .length(24)
        .hex()
        .message("Each ID must be a valid 24-character hexadecimal string"))
        .required()
        .min(1)
        .message("Please provide at least one category ID to delete")
        .messages({
        "array.base": "The IDs field must be an array of IDs.",
        "array.min": "The IDs array must contain at least one ID.",
        "any.required": "The IDs field is required and cannot be empty.",
        "string.hex": "Each ID must be a valid MongoDB ObjectId (24 characters, hexadecimal).",
        "string.length": "Each ID must be a valid MongoDB ObjectId (exactly 24 characters).",
    }),
});
