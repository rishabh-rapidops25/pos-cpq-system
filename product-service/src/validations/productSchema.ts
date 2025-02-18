// import Joi from "joi";

// export const productSchema = Joi.object({
//   productName: Joi.string()
//     .min(3)
//     .max(100)
//     .pattern(/^[A-Za-z0-9\s]+$/)
//     .required()
//     .messages({
//       "string.base": "Product name should be a string.",
//       "string.empty": "Product name cannot be empty.",
//       "string.min": "Product name should have at least 3 characters.",
//       "string.max": "Product name should not exceed 100 characters.",
//       "string.pattern.base":
//         "Product name can only contain letters, numbers, and spaces.",
//       "any.required": "Product name is required.",
//     }),

//   price: Joi.number().positive().precision(2).required().messages({
//     "number.base": "Price should be a number.",
//     "number.positive": "Price should be a positive number.",
//     "number.precision": "Price can have up to 2 decimal places.",
//     "any.required": "Price is required.",
//   }),

//   category: Joi.string().min(3).max(50).required().messages({
//     "string.base": "Category should be a string.",
//     "string.empty": "Category cannot be empty.",
//     "string.min": "Category should have at least 3 characters.",
//     "string.max": "Category should not exceed 50 characters.",
//     "any.required": "Category is required.",
//   }),

//   inStock: Joi.boolean().required().messages({
//     "boolean.base": "InStock should be a boolean.",
//     "any.required": "InStock is required.",
//   }),

//   description: Joi.string().max(500).optional().messages({
//     "string.base": "Description should be a string.",
//     "string.max": "Description should not exceed 500 characters.",
//   }),

//   imageURL: Joi.string().required().messages({
//     "string.base": "Image URL should be a string.",
//     "string.uri": "Image URL must be a valid URL.",
//     "any.required": "Image URL is required.",
//   }),
// });

// export const getAllProductsSchema = Joi.object({
//   page: Joi.number().integer().min(1).default(1),
//   limit: Joi.number().integer().min(1).default(10),
//   sortBy: Joi.string().valid("name", "price", "createdAt").default("createdAt"),
//   sortOrder: Joi.string().valid("asc", "desc").default("asc"),
// });

import Joi from "joi";

export const productSchema = Joi.object({
  productName: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z0-9\s]+$/)
    .required()
    .messages({
      "string.base": "Product name should be a string.",
      "string.empty": "Product name cannot be empty.",
      "string.min": "Product name should have at least 3 characters.",
      "string.max": "Product name should not exceed 100 characters.",
      "string.pattern.base":
        "Product name can only contain letters, numbers, and spaces.",
      "any.required": "Product name is required.",
    }),

  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price should be a number.",
    "number.positive": "Price should be a positive number.",
    "number.precision": "Price can have up to 2 decimal places.",
    "any.required": "Price is required.",
  }),

  finalPrice: Joi.number().positive().precision(2).required().messages({
    "number.base": "Final Price should be a number.",
    "number.positive": "Final Price should be a positive number.",
    "number.precision": "Final Price can have up to 2 decimal places.",
    "any.required": "Final Price is required.",
  }),

  category: Joi.string().min(3).max(50).required().messages({
    "string.base": "Category should be a string.",
    "string.empty": "Category cannot be empty.",
    "string.min": "Category should have at least 3 characters.",
    "string.max": "Category should not exceed 50 characters.",
    "any.required": "Category is required.",
  }),

  inStock: Joi.boolean().required().messages({
    "boolean.base": "InStock should be a boolean.",
    "any.required": "InStock is required.",
  }),

  description: Joi.string().max(500).optional().messages({
    "string.base": "Description should be a string.",
    "string.max": "Description should not exceed 500 characters.",
  }),

  imageURL: Joi.string().uri().optional().messages({
    "string.base": "Image URL should be a string.",
    "string.uri": "Image URL must be a valid URL.",
  }),

  colors: Joi.array()
    .items(Joi.string().min(3).max(50)) // Validate each color as a string
    .optional()
    .messages({
      "array.base": "Colors should be an array.",
      "array.items": "Each color should be a string.",
      "string.min": "Each color should have at least 3 characters.",
      "string.max": "Each color should not exceed 50 characters.",
    }),

  mount: Joi.array()
    .items(Joi.string().valid("inside", "outside")) // Validate against allowed mount types
    .optional()
    .messages({
      "array.base": "Mount should be an array.",
      "array.items":
        "Each mount option should be either 'inside' or 'outside'.",
    }),

  materials: Joi.array()
    .items(Joi.string().valid("wood", "aluminum", "cloth")) // Validate against allowed materials
    .optional()
    .messages({
      "array.base": "Materials should be an array.",
      "array.items": "Each material should be 'wood', 'aluminum', or 'cloth'.",
    }),
});
