"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComponentSchema = exports.getComponentByIdSchema = exports.getAllComponentSchema = exports.updateComponentGroupSchema = exports.createComponentGroupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Create Category Schema
exports.createComponentGroupSchema = joi_1.default.object({
    componentName: joi_1.default.string()
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
});
// Update Category Schema
exports.updateComponentGroupSchema = joi_1.default.object({
    componentName: joi_1.default.string()
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
});
exports.getAllComponentSchema = joi_1.default.object({
    componentName: joi_1.default.string().optional().messages({
        "string.base": "Category name must be a string.",
        "string.empty": "Category name cannot be empty.",
    }),
});
exports.getComponentByIdSchema = joi_1.default.object({
    id: joi_1.default.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
        "string.pattern.base": "Component ID must be a valid MongoDB ObjectId.",
        "string.empty": "Component ID cannot be empty.",
        "any.required": "Component ID is required.",
    }),
});
exports.deleteComponentSchema = joi_1.default.object({
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
