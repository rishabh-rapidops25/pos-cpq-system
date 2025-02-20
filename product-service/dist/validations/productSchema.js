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
        .custom((value) => value.toLowerCase()) // Convert to lowercase
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
    category: joi_1.default.string()
        .min(3)
        .max(50)
        .required()
        .custom((value) => value.toLowerCase()) // Convert to lowercase
        .messages({
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
    description: joi_1.default.string()
        .max(500)
        .optional()
        .custom((value) => value.toLowerCase()) // Convert to lowercase
        .messages({
        "string.base": "Description should be a string.",
        "string.max": "Description should not exceed 500 characters.",
    }),
    imageURL: joi_1.default.string().uri().optional().messages({
        "string.base": "Image URL should be a string.",
        "string.uri": "Image URL must be a valid URL.",
    }),
    colors: joi_1.default.array()
        .items(joi_1.default.object({
        colorCode: joi_1.default.string()
            .min(3)
            .max(50)
            .custom((value) => value.toLowerCase())
            .required(),
        price: joi_1.default.number().positive().precision(2).required(),
    }))
        .optional()
        .messages({
        "array.base": "Colors should be an array.",
        "array.items": "Each color should be an object with 'colorCode' and 'price'.",
    }),
    mount: joi_1.default.array()
        .items(joi_1.default.object({
        mountType: joi_1.default.string()
            .valid("inside", "outside")
            .custom((value) => value.toLowerCase())
            .required(),
        price: joi_1.default.number().positive().precision(2).required(),
    }))
        .optional()
        .messages({
        "array.base": "Mount should be an array.",
        "array.items": "Each mount option should be an object with 'mountType' and 'price'.",
    }),
    materials: joi_1.default.array()
        .items(joi_1.default.object({
        materialType: joi_1.default.string()
            .valid("wood", "aluminum", "cloth")
            .custom((value) => value.toLowerCase())
            .required(),
        price: joi_1.default.number().positive().precision(2).required(),
    }))
        .optional()
        .messages({
        "array.base": "Materials should be an array.",
        "array.items": "Each material should be an object with 'materialType' and 'price'.",
    }),
});
