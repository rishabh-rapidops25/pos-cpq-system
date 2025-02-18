"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productSchema = joi_1.default.object({
    productName: joi_1.default.string()
        .min(3)
        .max(100)
        .pattern(/^[A-Za-z0-9\s]+$/)
        .required()
        .messages({
        "string.base": "Product name should be a string.",
        "string.empty": "Product name cannot be empty.",
        "string.min": "Product name should have at least 3 characters.",
        "string.max": "Product name should not exceed 100 characters.",
        "string.pattern.base": "Product name can only contain letters, numbers, and spaces.",
        "any.required": "Product name is required.",
    }),
    price: joi_1.default.number().positive().precision(2).required().messages({
        "number.base": "Price should be a number.",
        "number.positive": "Price should be a positive number.",
        "number.precision": "Price can have up to 2 decimal places.",
        "any.required": "Price is required.",
    }),
    category: joi_1.default.string().min(3).max(50).required().messages({
        "string.base": "Category should be a string.",
        "string.empty": "Category cannot be empty.",
        "string.min": "Category should have at least 3 characters.",
        "string.max": "Category should not exceed 50 characters.",
        "any.required": "Category is required.",
    }),
    inStock: joi_1.default.boolean().required().messages({
        "boolean.base": "InStock should be a boolean.",
        "any.required": "InStock is required.",
    }),
    description: joi_1.default.string().max(500).optional().messages({
        "string.base": "Description should be a string.",
        "string.max": "Description should not exceed 500 characters.",
    }),
    imageURL: joi_1.default.string().required().messages({
        "string.base": "Image URL should be a string.",
        "string.uri": "Image URL must be a valid URL.",
        "any.required": "Image URL is required.",
    }),
});
// export const getAllProductsSchema = Joi.object({
//   page: Joi.number().integer().min(1).default(1),
//   limit: Joi.number().integer().min(1).default(10),
//   sortBy: Joi.string().valid("name", "price", "createdAt").default("createdAt"),
//   sortOrder: Joi.string().valid("asc", "desc").default("asc"),
// });
