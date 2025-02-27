import Joi from "joi";

// Create Category Schema
export const createComponentGroupSchema = Joi.object({
  componentName: Joi.string()
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
export const updateComponentGroupSchema = Joi.object({
  componentName: Joi.string()
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

export const getAllComponentSchema = Joi.object({
  componentName: Joi.string().optional().messages({
    "string.base": "Category name must be a string.",
    "string.empty": "Category name cannot be empty.",
  }),
});

export const getComponentByIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Component ID must be a valid MongoDB ObjectId.",
      "string.empty": "Component ID cannot be empty.",
      "any.required": "Component ID is required.",
    }),
});

export const deleteComponentSchema = Joi.object({
  ids: Joi.array()
    .items(
      Joi.string()
        .length(24)
        .hex()
        .message("Each ID must be a valid 24-character hexadecimal string")
    )
    .required()
    .min(1)
    .message("Please provide at least one category ID to delete")
    .messages({
      "array.base": "The IDs field must be an array of IDs.",
      "array.min": "The IDs array must contain at least one ID.",
      "any.required": "The IDs field is required and cannot be empty.",
      "string.hex":
        "Each ID must be a valid MongoDB ObjectId (24 characters, hexadecimal).",
      "string.length":
        "Each ID must be a valid MongoDB ObjectId (exactly 24 characters).",
    }),
});
